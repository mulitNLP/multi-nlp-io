package com.bknote71.multinlpio.game.room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class LeaderBoardTemplate {
    private static RedisTemplate<String, String> redisTemplate;
    private static ZSetOperations<String, String> ops;

    @Autowired
    public LeaderBoardTemplate(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.ops = redisTemplate.opsForZSet();
    }

    public static void updateLeaderBoard(int roomId, String username, int score) {
        ops.add("gameroom:" + roomId, username, score);
    }

    public static void union() {
        // 모든 룸들의 플레이어들을 통합 <<
        String pattern = "gameroom:*";
        String destKey = "today_ranking";
        Set<String> keys = scanKeysByPattern(pattern);
        ops.unionAndStore(destKey, keys, destKey);
    }

    private static Set<String> scanKeysByPattern(String pattern) {
        Set<String> keys = new HashSet<>();
        ScanOptions options = ScanOptions.scanOptions().match(pattern).build();
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(options);

        while (cursor.hasNext()) {
            keys.add(new String(cursor.next()));
        }
        cursor.close();

        return keys;
    }
}
