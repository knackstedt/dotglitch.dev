export default Object.seal({
    rainWidth: 10,
    rainHeight: 8,
    minFrameTime: 50,
    rainGenerator: Object.seal({
        count: 75,
    }),
    rainDrop: Object.seal({
        direction: "TD",
        charArrays: ["ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰᛱᛲᛳᛴᛵᛶᛷᛸ"],
        headColor: "rgba(255,193,7,1)",
        trailColor: "rgba(255,193,7,.8)",
        fontSize: 16,
        fontFamily: "Arial",
        randomizeFrameDelay: true,
        minFrameDelay: 50,
        maxFrameDelay: 130,
        jitterLeftStrength: 6,
        jitterRightStrength: 0,
        jitterUpStrength: 0,
        jitterDownStrength: 0
    }),
    trailBloomSize: 4,
    trailBloomColor: "#ff9800",
    headBloomSize: 2,
    headBloomColor: "#673ab7",

    warmupIterations: 50,
    fadeStrength: 0.05,
});
