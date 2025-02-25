import IntuitController from "../controllers/intuit";
import IntuitService from "../services/intuit";

export default class IntuitContext {
    public static getControllerContext(): IntuitController {
        const intuitService: IntuitService = new IntuitService();
        return new IntuitController(intuitService);
    }
}
