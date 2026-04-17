package hcmut.online_examination.exception;

public class ForbiddenException extends RuntimeException {

    public ForbiddenException() {
        super("Forbidden");
    }

    public ForbiddenException(String message) {
        super(message != null ? message : "Forbidden");
    }
}