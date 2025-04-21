import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUserProfile = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
    subjects: v.array(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const existingProfile = await ctx.db
      .query("userProfiles")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (existingProfile) {
      throw new Error("User profile already exists");
    }

    return await ctx.db.insert("userProfiles", {
      ...args,
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getUserProfile = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProfiles")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
  },
});

export const sendMessage = mutation({
  args: {
    receiverId: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const senderId = identity.subject;
    return await ctx.db.insert("messages", {
      senderId,
      receiverId: args.receiverId,
      content: args.content,
      createdAt: Date.now(),
    });
  },
});

export const getMessages = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const sentMessages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("senderId"), args.userId))
      .collect();

    const receivedMessages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("receiverId"), args.userId))
      .collect();

    return {
      sent: sentMessages,
      received: receivedMessages,
    };
  },
});

export const handleClerkWebhook = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    eventType: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, email, name, eventType } = args;
    
    // Check if user profile exists
    const existingProfile = await ctx.db
      .query("userProfiles")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    
    if (eventType === "user.created") {
      // Create a new user profile if it doesn't exist
      if (!existingProfile) {
        return await ctx.db.insert("userProfiles", {
          userId,
          name,
          email,
          role: "student", // Default role
          subjects: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    } else if (eventType === "user.updated") {
      // Update the user profile if it exists
      if (existingProfile) {
        return await ctx.db.patch(existingProfile._id, {
          name,
          email,
          updatedAt: Date.now(),
        });
      }
    }
    
    return null;
  },
}); 