import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const createNote = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    subject: v.string(),
    price: v.number(),
    previewPages: v.number(),
    totalPages: v.number(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const user = await ctx.db
      .query("userProfiles")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!user) {
      throw new Error("User profile not found");
    }

    return await ctx.db.insert("notes", {
      ...args,
      authorId: userId,
      authorName: user.name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getNotes = query({
  args: { subject: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const notes = await ctx.db.query("notes").collect();
    if (args.subject) {
      return notes.filter((note) => note.subject === args.subject);
    }
    return notes;
  },
});

export const getNoteById = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getUserNotes = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("authorId"), args.userId))
      .collect();
  },
}); 