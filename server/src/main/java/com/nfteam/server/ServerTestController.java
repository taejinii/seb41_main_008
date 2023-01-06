package com.nfteam.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerTestController {
    @GetMapping
    public String homeTest() {
        return "개발 서버 정상 동작 확인 테스트 - 디비 연결 테스트";
    }
}
