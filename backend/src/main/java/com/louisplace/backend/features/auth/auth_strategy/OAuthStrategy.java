package com.louisplace.backend.features.auth.auth_strategy;

import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.louisplace.backend.features.auth.OAuthProviderEnum;
import com.louisplace.backend.features.auth.config.OAuthConfig;

@Component
public class OAuthStrategy implements IAuthStragegy {
        private static final String STRATEGY_TYPE = "OAUTH";

        private static final String PARAM_CODE = "code";
        private static final String PARAM_CLIENT_ID = "client_id";
        private static final String PARAM_CLIENT_SECRET = "client_secret";
        private static final String PARAM_REDIRECT_URI = "redirect_uri";
        private static final String PARAM_GRANT_TYPE = "grant_type";
        private static final String GRANT_TYPE_AUTH_CODE = "authorization_code";
        private static final String FIELD_ACCESS_TOKEN = "access_token";

        private static final String FIELD_EMAIL = "email";

        private final WebClient webClient;
        private final OAuthConfig oAuthConfig;

        public OAuthStrategy(OAuthConfig oAuthConfig, WebClient.Builder webClientBuilder) {
                this.oAuthConfig = oAuthConfig;
                this.webClient = webClientBuilder.build();
        }

        @Override
        public AuthUserInfoDTO authenticate(String identifier, String credential) {
                OAuthProviderEnum provider = OAuthProviderEnum.fromString(identifier);
                MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
                formData.add(PARAM_CODE, credential);
                formData.add(PARAM_CLIENT_ID, oAuthConfig.getClientId(provider));
                formData.add(PARAM_CLIENT_SECRET, oAuthConfig.getClientSecret(provider));
                formData.add(PARAM_REDIRECT_URI, oAuthConfig.getRedirectUri(provider));
                formData.add(PARAM_GRANT_TYPE, GRANT_TYPE_AUTH_CODE);

                Map<String, Object> tokenResponse = webClient.post()
                                .uri(provider.getTokenUrl())
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .accept(MediaType.APPLICATION_JSON)
                                .body(BodyInserters.fromFormData(formData))
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                                })
                                .block();
                String accessToken = (String) tokenResponse.get(FIELD_ACCESS_TOKEN);

                Map<String, Object> userInfo = webClient.get()
                                .uri(provider.getUserInfoUrl())
                                .headers(headers -> headers.setBearerAuth(accessToken))
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                                })
                                .block();

                String email = (String) userInfo.get(FIELD_EMAIL);

                if (email == null && provider.getEmailUrl() != null) {
                        List<Map<String, Object>> emails = webClient.get()
                                        .uri(provider.getEmailUrl())
                                        .headers(headers -> headers.setBearerAuth(accessToken))
                                        .retrieve()
                                        .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {
                                        })
                                        .block();

                        email = emails.stream()
                                        .filter(e -> Boolean.TRUE.equals(e.get("primary"))
                                                        && Boolean.TRUE.equals(e.get("verified")))
                                        .map(e -> (String) e.get(FIELD_EMAIL))
                                        .findFirst()
                                        .orElse(null);
                }

                AuthUserInfoDTO authUserInfo = new AuthUserInfoDTO(
                                (String) userInfo.get(provider.getFirstNameField()),
                                (String) userInfo.get(provider.getLastNameField()),
                                email);
                return authUserInfo;
        }

        @Override
        public boolean supports(String strategyType) {
                return STRATEGY_TYPE.equalsIgnoreCase(strategyType);
        }

}
