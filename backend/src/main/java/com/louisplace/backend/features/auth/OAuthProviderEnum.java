package com.louisplace.backend.features.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OAuthProviderEnum {
    GOOGLE("google",
            "https://oauth2.googleapis.com/token",
            "https://www.googleapis.com/oauth2/v2/userinfo",
            "given_name",
            "family_name"),
    GITHUB("github",
            "https://github.com/login/oauth/access_token",
            "https://api.github.com/user",
            "name",
            "name");

    private final String name;
    private final String tokenUrl;
    private final String userInfoUrl;
    private final String firstNameField;
    private final String lastNameField;

    public static OAuthProviderEnum fromString(String provider) {
        for (OAuthProviderEnum p : OAuthProviderEnum.values()) {
            if (p.name.equalsIgnoreCase(provider)) {
                return p;
            }
        }
        throw new IllegalArgumentException("Unsupported provider: " + provider);
    }
}
