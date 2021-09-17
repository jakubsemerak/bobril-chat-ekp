import {CommentStore} from "../../src/stores/commentStore";

describe("commentStore", function () {
    let store: CommentStore;

    beforeEach(() => {
        store = new CommentStore();
    });


    describe("get", () => {
        it("given correct id should return correct comment from store", () => {
            store.add({
                from: 1,
                to: 2,
                text: "Question?",
                created: "2021.09.14",
            });

            store.add({
                from: 2,
                to: 1,
                text: "Answer?",
                created: "2021.09.14",
            });

            const comment = store.get(1);

            expect(comment).toBeDefined();
            expect(comment!.text).toBe("Question?");
        });

        it("given correct commentId get should return reply in original comment", () => {
            store.add({
                from: 1,
                to: 2,
                text: "Question?",
                created: "2021.09.14",
            });

            store.addReply(1, {
                from: 2,
                to: 1,
                text: "Answer in thread.",
                created: "2021.09.14",
            });

            const comment = store.get(1);

            expect(comment).toBeDefined();
            expect(comment!.replies).toBeDefined();
            expect(comment!.replies!.length).toBe(1);
            expect(comment!.replies![0]).toBeDefined();
            expect(comment!.replies![0]!.text).toBe("Answer in thread.");
        });
    });


    describe("delete", () => {
        it("should remove comment and get should return undefined", () => {
            store.add({
                from: 1,
                to: 2,
                text: "Question?",
                created: "2021.09.14",
            });

            store.delete(1);
            const comment = store.get(1);
            expect(comment).toBeUndefined();
        });
    });

    describe("edit", () => {
        it("should edit comment's text ", () => {
            store.add({
                from: 1,
                to: 2,
                text: "Question?",
                created: "2021.09.14",
            });

            store.edit(1, "Edited question?");
            const comment = store.get(1);

            expect(comment).toBeDefined();
            expect(comment!.text).toBe("Edited question?");
        });
    });

    describe("getCommentsWithUser", () => {
        it("should return comments for the given user ids", () => {
            store.add({
                from: 1,
                to: 2,
                text: "Question?",
                created: "2021.09.14",
            });

            store.add({
                from: 2,
                to: 1,
                text: "Answer.",
                created: "2021.09.18",
            });

            store.add({
                from: 2,
                to: 1,
                text: "Finally!",
                created: "2021.09.18",
            });

            store.add({
                from: 1,
                to: 3,
                text: "Message to another person.",
                created: "2021.09.18",
            });

            const comments = store.getCommentsWithUser(1, 2);
            expect(comments).toBeDefined();
            expect(comments.length).toBe(3);
            expect(comments[2].text).toBe("Finally!");
        });

        it("should not return comments from another users", () => {
            store.add({
                from: 1,
                to: 2,
                text: "Question?",
                created: "2021.09.14",
            });

            store.add({
                from: 2,
                to: 1,
                text: "Answer.",
                created: "2021.09.18",
            });

            const comments = store.getCommentsWithUser(1, 3);
            expect(comments.length).toBe(0);
            expect(comments).toEqual([]);

            const comments2 = store.getCommentsWithUser(3, 1);
            expect(comments2.length).toBe(0);
            expect(comments2).toEqual([]);
        });
    });
});