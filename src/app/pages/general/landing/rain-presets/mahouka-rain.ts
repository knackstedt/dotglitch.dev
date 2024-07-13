
export default Object.seal({
    rainWidth: 10,
    rainHeight: 12,
    minFrameTime: 50,
    rainGenerator: Object.seal({
        count: 45,
    }),
    rainDrop: Object.seal({
        direction: "TD",
        charArrays: ["012"],
        headColor: "rgba(33,150,243,0.8)",
        trailColor: "rgba(21,101,192,1)",
        fontSize: 16,
        minFrameDelay: 50,
        maxFrameDelay: 130,
        fontFamily: "Arial",
        randomizeFrameDelay: true,
    }),
    trailBloomSize: 12,
    trailBloomColor: "#00bcd4",
    headBloomSize: 4,
    headBloomColor: "#29b6f6",
    warmupIterations: 50,
    fadeStrength: 0.05,
});
