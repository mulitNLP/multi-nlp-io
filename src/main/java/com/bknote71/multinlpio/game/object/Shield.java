package com.bknote71.multinlpio.game.object;

import com.bknote71.multinlpio.game.room.GameRoom;
import com.bknote71.multinlpio.protocol.info.GameObjectType;
import com.bknote71.multinlpio.protocol.info.SkillInfo;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
public class Shield extends GameObject {

    private GameObject owner;

    private SkillInfo skill;
    private long removeTime;


    public Shield() {
        setType(GameObjectType.Shield);
    }

    long nextUpdateTick = 0;

    public boolean update() {
        GameRoom room = getGameRoom();
        int objectId = getId();
        if (room == null)
            return false;

        if (owner == null || System.currentTimeMillis() > removeTime) {
            room.push(room::leaveGame, objectId);
            return false;
        }
        return true;
    }

    public void setSkill(SkillInfo skill) {
        this.skill = skill;
        this.removeTime = System.currentTimeMillis() + skill.getDuration();
    }

}
