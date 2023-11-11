// @Injectable()
export class ToastService {
    public static messages: string[] = [];

    public static alert(message: string, blocking = false): Promise<boolean> {
        return new Promise(resolve => {
            if (blocking) {
                window.alert(message);
                resolve(true);
            } else {
                const result = window.confirm(message);
                resolve(result);
            }
        })
    }
}
