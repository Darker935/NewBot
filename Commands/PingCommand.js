class PingCommand {
    onCommand(api, message) {
    }
    command() {
        return "ping";
    }
    alias() {
        return new Set(["pong", "runtime"]);
    }
}
export default PingCommand;
