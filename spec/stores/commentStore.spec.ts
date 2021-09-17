import {CommentStore} from "../../src/stores/commentStore";

describe('commentStore', function () {
    let store: CommentStore;

    beforeEach(() => {
        store = new CommentStore();
    });


    describe('get', () => {
        it('given correct id should return correct comment from store', () => {
            store.add({
                from: 1,
                to: 2,
                text: "Question?",
                created: "2021.09.14",
            });

            const comment = store.get(1);

            expect(comment).toBeDefined();
            expect(comment?.text).toBe("Question?");
        });
    });
});