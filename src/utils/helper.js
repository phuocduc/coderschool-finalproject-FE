
import React from "react"

// use ReactJS
export function strWords(textToLimit, wordLimit, subs = "...") {
    try {
        let finalText = "";
        const text2 = textToLimit.replace(/\s+/g, " ");
        const text3 = text2.split(" ");
        const numberOfWords = text3.length;
        let i = 0;

        if (numberOfWords > wordLimit) {
            for (i = 0; i < wordLimit; i++) {
                finalText = finalText + " " + text3[i] + " ";
            }

            return (
                <>
                    {finalText} {subs}
                </>
            );
        } else return textToLimit;
    } catch (error) {
        return textToLimit;
    }
}