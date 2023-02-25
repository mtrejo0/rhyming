import { Box, Button, Grid, Stack, TextField, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState(
    `Alright, here we go, third take
Real quick, Ali
Mmm
Got me breathing with dragons
I'll crack the egg in your basket, you bastard
I'm Marilyn Manson with madness
Now just imagine the magic I light to asses
Don't ask for your favorite rapper
(He dead), yes, sir (amen), church
(He dead), I killed him (amen), bitch
And this is rigor mortis, and it's gorgeous when you die
Ali recorded, and I'm Morpheus, the matrix of my mind
I'm out the orbit, you an orphan and a hairdresser combined
I'm on the toilet when I rhyme, if you the shit, then I decline
I climax where you begin, and then I end on cloud nine
And that's important when you morph into an angel in the sky
And don't be forging all my signatures, my listeners reply
And tell me that you biting style, you got a hell of an appetite
And I'ma be here for a while, just buckle up before the ride
Or knuckle up if you can fight, we always making 'em duck or die
A suit and tie is suitable and usual in suicide
CSI just might investigate this fucking parasite
(He dead, amen)
That's what they telling me
Aim it at your celebrity, this is studio felony
Ferragami so many and cool enough for the '70s
Nigga, payback's a bitch, and bitch, you been livin' in debt with me
Dead 'em all and especially
Leave a call on his mother voicemail that say that he rest in peace
Bigger chopper the recipe
Wrestling? That's irrelevant, rather rest at your residence
Whistling to the melody, couldn't think of a better D
Better be on your P and Q, it's just me, Jay Rock, Soul, and Q
Solar system and barbecue, nothing else you can do`
  );
  const [result, setResult] = useState<{ colors: any }>();
  const [loading, setLoading] = useState(false);

  const getRhymes = async () => {
    const bodyContent = { text };
    setLoading(true);

    await axios
      .post(
        "https://vo42dkc6z2.execute-api.us-east-2.amazonaws.com/dev",
        bodyContent
      )
      .then((res) => {
        setResult(res.data.body);
      })
      .catch((err) => console.warn(err))
      .then(() => setLoading(false));
  };

  const getLines = () => {
    const lines = text.split("\n");

    return lines.map((line) =>
      line.split(" ").map((each) =>
        each
          .toLowerCase()
          .replace(/[^\w\s\']|_/g, "")
          .replace(/\s+/g, " ")
      )
    );
  };

  const [shiftDown, setShiftDown] = useState(false);
  const [wordsCombine, setWordsCombine] = useState<Set<string>>(new Set());

  const getRandomColor = useCallback(() => {
    const letters: string = "0123456789ABCDEF";
    let color: string = "#";
    for (let i: number = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 6) + 3];
    }
    for (let i: number = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 6) + 9];
    }
    return color;
  }, []);

  const getAllRhymes = useCallback(
    (word: string) => {
      const color = result?.colors[word];

      const words = [];

      for (const key in result?.colors) {
        if (result?.colors[key] === color) {
          words.push(key);
        }
      }

      return words.join(",  ");
    },
    [result]
  );

  const addWord = (word: string) => {
    if (!shiftDown) return;

    setWordsCombine((s) => s.add(word));
  };

  const normalizeColors = useCallback(
    (wordList: string[]) => {
      setResult((s: any) => {
        const colorsCopy = { ...s?.colors };

        const colorToMapTo = colorsCopy[wordList[0]] ?? getRandomColor();

        for (const i in wordList) {
          if (!colorsCopy[wordList[i]]) {
            colorsCopy[wordList[i]] = colorToMapTo;
          }
        }

        const colorsToOverride = wordList.map((each) => colorsCopy[each]);

        for (const key in colorsCopy) {
          if (colorsToOverride.includes(colorsCopy[key])) {
            colorsCopy[key] = colorToMapTo;
          }
        }

        return { ...s, colors: colorsCopy };
      });
    },
    [getRandomColor]
  );

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "a") {
        setShiftDown(true);
      }
    });

    document.addEventListener("keyup", function (event) {
      if (event.key === "a") {
        setShiftDown(false);

        setWordsCombine((words) => {
          normalizeColors(Array.from(words));
          return new Set();
        });
      }
    });
  }, [normalizeColors]);

  return (
    <Box sx={{ margin: "32px" }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        fullWidth
        label="Add your lyrics!"
      ></TextField>
      <Button
        onClick={async () => await getRhymes()}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>

      <p>Hold A and click two words to highlight them as the same rhyme!</p>
      {loading && <p>Loading ...</p>}
      <Box m={4} key={JSON.stringify(result)}>
        {getLines().map((line, i) => {
          return (
            <Stack
              direction="row"
              spacing={1}
              key={line.toString() + i}
              sx={{ marginTop: "8px" }}
            >
              {line.map((each) => {
                let c = undefined;
                if (result?.colors?.[each]) {
                  c = result?.colors?.[each];
                }
                return (
                  <Grid
                    xs={2}
                    item
                    sx={{
                      background: c,
                      borderRadius: 1,
                      border: "1px solid black",
                      cursor: "pointer",
                    }}
                    key={each + i + Math.random() + c}
                  >
                    <Tooltip title={getAllRhymes(each)}>
                      <Box
                        style={{
                          margin: "4px",
                          marginLeft: "8px",
                          marginRight: "8px",
                        }}
                        onClick={() => addWord(each)}
                      >
                        {each}
                      </Box>
                    </Tooltip>
                  </Grid>
                );
              })}
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
}

export default App;
