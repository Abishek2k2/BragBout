import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    title: v.string(),
    description: v.string(),
    subject: v.string(),
    price: v.number(),
    previewPages: v.number(),
    totalPages: v.number(),
    fileUrl: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_author", ["authorId"]),

  purchases: defineTable({
    noteId: v.id("notes"),
    buyerId: v.string(),
    sellerId: v.string(),
    amount: v.number(),
    status: v.string(),
    createdAt: v.number(),
  }).index("by_buyer", ["buyerId"]),

  messages: defineTable({
    senderId: v.string(),
    receiverId: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_sender", ["senderId"]).index("by_receiver", ["receiverId"]),

  userProfiles: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    role: v.string(), // "student" or "senior"
    subjects: v.array(v.string()),
    bio: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
}); 