package hcmut.online_examination.exception;

public class InvalidExamPasscodeException extends RuntimeException {
    public InvalidExamPasscodeException() {
        super("Invalid exam passcode");
    }
}
