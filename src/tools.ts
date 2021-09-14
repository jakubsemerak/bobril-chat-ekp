export abstract class DateTime {
    static now() : string {
        return new Date().toJSON().slice(0,10).replace(/-/g,'.');
    }
}