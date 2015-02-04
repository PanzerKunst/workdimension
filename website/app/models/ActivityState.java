package models;

public enum ActivityState {
    DONE("DONE");

    private String string;

    private ActivityState(String string) {
        this.string = string;
    }

    public String getString() {
        return this.string;
    }
}
