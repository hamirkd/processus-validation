package com.processus.entities;

public enum RequestState {
    INITIAL("INITIAL"),
    APPROVED_MANAGER("APPROVED_MANAGER"),
    REJECTED_MANAGER("REJECTED_MANAGER"),
    END("END"),
    REDIRECTED_MANAGER("REDIRECTED_MANAGER"),
    REDIRECTED_DIRECTOR("REDIRECTED_MANAGER"),

    APPROVED_REDIRECT_MANAGER("APPROVED_REDIRECT_MANAGER"),
    REJECTED_REDIRECT_MANAGER("REJECTED_REDIRECT_MANAGER"),

    REJECTED_DIRECTOR("REJECTED_DIRECTOR"),
    REJECTED_REDIRECT_DIRECTOR("REJECTED_REDIRECT_DIRECTOR");

    private final String description;

    RequestState(String description) {
        this.description = description;
    }

    public boolean isInitial() {
        return this == INITIAL;
    }

    public boolean isApprovedManager() {
        return this == APPROVED_MANAGER;
    }

    public boolean isRejectedManager() {
        return this == REJECTED_MANAGER;
    }

    public boolean isRejectedDirector() {
        return this == REJECTED_DIRECTOR;
    }

    public boolean isRejectedRedirectDirector() {
        return this == REJECTED_REDIRECT_DIRECTOR;
    }

    public boolean isEnd() {
        return this == END;
    }

    public boolean isRejected() {
        return this.isRejectedManager() || isRejectedDirector() || isRejectedRedirectDirector();
    }
}
