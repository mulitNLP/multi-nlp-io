package com.bknote71.multinlpio.game.object;

import com.bknote71.multinlpio.game.Vector2d;
import com.bknote71.multinlpio.protocol.info.GameObjectType;
import com.bknote71.multinlpio.protocol.info.MoveDir;
import com.bknote71.multinlpio.session.ClientSession;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter @Setter
public class Player extends GameObject {

    private ClientSession session;
    private int score; // 실시간 점수 ?
    private double direction;
    private double speed;
    private int mapSize;

    // shield
    private Deque<Shield> shields = new ArrayDeque<>();

    public Player() {
        setType(GameObjectType.Player);
    }

    public int getPlayerId() {
        return getId();
    }

    private Set<MoveDir> dirs = new HashSet<>();

    public void init(int mapSize) {
        score = 0;
        direction = 3.14;
        speed = getInfo().getStatInfo().getSpeed();
        this.mapSize = mapSize;
        System.out.println("speed and mapSize: " + speed + " " + mapSize);
    }

    public void update() {
        // shield update ??
        // 처음부터 ~ removePoint 까지 모두 제거
        while (!shields.isEmpty() && System.currentTimeMillis() > shields.peekFirst().getRemoveTime())
            shields.pollFirst();

        Vector2d curpos = pos();

        /* curpos.x = Math.max(0, Math.min(mapSize, curpos.x));
        curpos.y = Math.max(0, Math.min(mapSize, curpos.y)); */

        if (dirs.contains(MoveDir.North)) {
            direction = Math.atan2(0, curpos.y - speed); // 200 이 나중에는 player.speed()
            curpos.y -= speed / 40;
        }
        if (dirs.contains(MoveDir.South)) {
            direction = Math.atan2(0, curpos.y + speed - mapSize); // 200 이 나중에는 player.speed()
            curpos.y += speed / 40;
        }
        if (dirs.contains(MoveDir.East)) {
            direction = Math.atan2(curpos.x + speed, 0); // 200 이 나중에는 player.speed()
            curpos.x += speed / 40;
        }
        if (dirs.contains(MoveDir.West)) {
            direction = Math.atan2(curpos.x - speed - mapSize, 0); // 200 이 나중에는 player.speed()
            curpos.x -= speed / 40;
        }

        curpos.x = (curpos.x + mapSize) % mapSize;
        curpos.y = (curpos.y + mapSize) % mapSize;

    }

    @Override
    public boolean guard() {
        // 제일 앞의 쉴드 제거
        if (shields.isEmpty())
            return false;

        Shield shield = shields.pollFirst();
        return true;
    }

    public void addShield(Shield shield) {
        shields.offerLast(shield);
    }

    public void addDir(MoveDir dir) {
        dirs.add(dir);
    }

    public void removeDir(MoveDir dir) {
        dirs.remove(dir);
    }
}
