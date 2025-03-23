{
  "#comment": "Level Created By Kirikot's Level Editor Tool!",
  "objects": [
    {
      "objclass": "LevelDefinition",
      "objdata": {
        "Name": "Test Levelo",
        "Description": "BRUAHAHH",
        "LevelNumber": 0.0,
        "Loot": "RTID(DefaultLoot@LevelModules)",
        "DisableRestart": true,
        "FixedPlantLevel": -1.0,
        "ZombieLevel": 0.0,
        "GridItemLevel": 0.0,
        "FirstRewardParam": "moneybag",
        "ReplayRewardParam": "moneybag",
        "StartingSun": 50.0,
        "AddBonusStartingSun": true,
        "ForceToWorldMap": true,
        "RepeatPlayForceToWorldMap": true,
        "VictoryModule": "RTID(VictoryOutro@LevelModules)",
        "LossModule": "RTID(ZombiesAteYourBrainsOutro@LevelModules)",
        "StageModule": "RTID(Stage@CurrentLevel)",
        "Modules": [
          "RTID(ZombiesDeadWinCon@LevelModules)",
          "RTID(DefaultZombieWinCondition@LevelModules)",
          "RTID(SeedBank@CurrentLevel)",
          "RTID(VeryFastSunDropper@LevelModules)",
          "RTID(StandardIntro@LevelModules)",
          "RTID(NewWaves@CurrentLevel)"
        ]
      }
    },
    {
      "objclass": "JoustStageProperties",
      "aliases": [
        "Stage"
      ],
      "objdata": {
        "ResourceGroupNames": [
          "DelayLoad_Background_FrontLawn_halloween",
          "AudioDarkAges",
          "AudioTutorial",
          "ZombiePirateSwashbucklerGroup",
          "ZombieDarkBasicGroup",
          "Tombstone_Dark_Base",
          "Tombstone_Dark_Effects",
          "Dark_Background_Effects",
          "Eighties_Background_Effects"
        ],
        "GroupsToUnloadForAds": [
          "DelayLoad_Background_FrontLawn_halloween"
        ],
        "StagePrefix": "dark",
        "BackgroundResourceGroup": "DelayLoad_Background_FrontLawn_halloween",
        "BackgroundImagePrefix": "IMAGE_BACKGROUNDS_FRONTLAWN_LOD_HALLOWEEN",
        "LevelPowerupSet": "LevelPowerupsDefault",
        "BasicZombieTypeName": "halloween",
        "FlagZombieTypeName": "halloween_flag",
        "FlagVeteranZombieTypeNames": [
          "dino_flag_veteran"
        ],
        "Armor1ZombieTypeName": "halloween_armor1",
        "Armor2ZombieTypeName": "bighead_armor2",
        "Armor3ZombieTypeName": "dark_armor3",
        "Armor4ZombieTypeName": "dino_armor4",
        "RailcartDefaultTypeName": "railcart_tutorial",
        "GravestoneDefaultTypeName": "poison_tile",
        "DirtSpawnEffectName": "POPANIM_EFFECTS_DIRT_SPAWN_GRASS",
        "MusicSuffix": "DarkAges",
        "AmbientAudioSuffix": "Amb_Tutorial_Garden_BG_LP"
      }
    },
    {
      "objclass": "SeedBankProperties",
      "aliases": [
        "SeedBank"
      ],
      "objdata": {
        "SelectionMethod": "chooser"
      }
    },
    {
      "objclass": "WaveManagerModuleProperties",
      "aliases": [
        "NewWaves"
      ],
      "objdata": {
        "WaveManagerProps": "RTID(WaveManagerProps@CurrentLevel)"
      }
    },
    {
      "objclass": "WaveManagerProperties",
      "aliases": [
        "WaveManagerProps"
      ],
      "objdata": {
        "WaveCount": 1,
        "FlagWaveInterval": 1.0,
        "SuppressFlagZombie": false,
        "SpawnColStart": 2.0,
        "SpawnColEnd": 8.0,
        "MinNextWaveHealthPercentage": 0.5,
        "MaxNextWaveHealthPercentage": 0.7,
        "WaveSpendingPoints": 100.0,
        "WaveSpendingPointIncrement": 75.0,
        "WavesAlwaysRandomized": false,
        "Waves": [
          [
            "RTID(Wave0Event0@CurrentLevel)",
            "RTID(Wave0Event1@CurrentLevel)"
          ]
        ]
      }
    },
    {
      "objclass": "SpawnZombiesJitteredWaveActionProps",
      "aliases": [
        "Wave0Event0"
      ],
      "objdata": {
        "AdditionalPlantfood": 0,
        "Zombies": [
          {
            "Type": "RTID(roman_gargantuar@ZombieTypes)"
          }
        ]
      }
    },
    {
      "objclass": "HamsterZombieSpawnerProps",
      "aliases": [
        "Wave0Event1"
      ],
      "objdata": {
        "ColumnStart": -1,
        "ColumnEnd": -1,
        "GroupSize": 0,
        "TimeBetweenGroups": 0,
        "Zombies": [
          {
            "Type": "RTID(hamster_ball@ZombieTypes)",
            "ZombieInsideBallType": "roman_gargantuar",
            "HasPlantfood": true,
            "Behavior": 1,
            "SpeedBeforeImpact": 0.5,
            "AddedImmunities": [
              "none"
            ]
          }
        ]
      }
    }
  ],
  "version": 1
}