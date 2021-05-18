async function getQiitaMd(itemId: string) {
  const res = await fetch("https://qiita.com/api/v2/items/" + itemId);
  const resJson = await res.json();
  //console.log(resJson);

  const mk = resJson.body as string;
  //const mk = Deno.readTextFileSync("./deno/words.md"); //resJson.body;
  //console.log(mk);
  //Deno.writeTextFileSync("words.md", mk);

  return mk;
}

const mk = await getQiitaMd("7dde25dcffae4cdc7923");

const boldStrings = mk.matchAll(/\*\*(.*)\*\*/g);
console.log(boldStrings);

const words: string[] = [];
for (const boldString of boldStrings) {
  //console.log(boldString);
  const words_ = boldString[1].split("/").map((e) => e.trim()).filter((e) =>
    (/^\w*$/).test(e)
  );
  words.push(...words_);
}

console.log(words);
Deno.writeTextFileSync("./words.json", JSON.stringify(words));
