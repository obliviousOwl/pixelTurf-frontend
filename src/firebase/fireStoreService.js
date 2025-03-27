import { db } from "../firebase";
import { collection, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";


export const addToLeaderboard = async (player1, player2) => {
    try{
        await addDoc(collection(db, "leaderboard"),{
            playerId: player1.id,
            playerName: player1.playerName,
            score: player1.score,
            timestamp: serverTimestamp()
        });

        console.log("Match result added successfully!");
    }
    catch(error) {
        console.log("Error adding match results: ", error);
    }
};
