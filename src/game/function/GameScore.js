// export default class GameScore {
//     constructor(scene) {
//         this.scene = scene;
//         this.paintedAreas = new Map();
//         this.scores = {};
//     }

//     create(players) {
//         players.forEach(player => {
//             this.scores[player.id] = 0;
//         });

//         this.scoreText = this.scene.add.text(20, 50, "Scores", {
//             fontSize: "24px",
//             fill: "#fff"
//         });

//         this.updateScoreDisplay();
//     }

//     paintPixel(x, y, playerId) {
//         const key = `${Math.floor(x)}, ${Math.floor(y)}`;

//         if (!this.paintedAreas.has(key)) {
//             // Only increase score if this pixel wasn't painted before
//             this.paintedAreas.set(key, playerId);
//             this.scores[playerId] = (this.scores[playerId] || 0) + 1;
//         } else {
//             const previousPlayer = this.paintedAreas.get(key);

//             if (previousPlayer !== playerId) {
//                 // If another player overwrites this area, reduce their score
//                 this.scores[previousPlayer] = Math.max(0, this.scores[previousPlayer] - 1);
//                 this.paintedAreas.set(key, playerId);
//                 this.scores[playerId] = (this.scores[playerId] || 0) + 1;
//             }
//         }
//         // console.log(`Painting at ${x}, ${y} by Player ${playerId}`); // Debug

//         this.updateScoreDisplay();
//     }

//     updateScoreDisplay() {
//         let scoreText = "Scores\n";
//         for(const playerId in this.scores) {
//             scoreText += `player ${playerId}: ${this.scores[playerId]}\n`;
//         }
//         this.scoreText.setText(scoreText);
//     }
// }
