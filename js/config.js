/* ==========================================================================
   NIDU'S BIRTHDAY — CONTENT FILE
   Everything you'll want to edit lives here. No other file needs touching
   to change words, photos, letters, memories or quiz questions.

   PHOTOS: put images in the /photos folder and set  src: "photos/your-file.jpg"
           (thumb = optional smaller copy for the board · wide: true for landscape)
           Leave src: "" to keep the blue cyanotype placeholder.
           motif (placeholder only): tower | butterfly | hydrangea | bloom |
                                     notes | heart | sparkle | book
   SEALS:  butterfly | heart | star | flower | N
   PAPERS: lined | plain | grid | airmail
   LETTERS: greeting, signoff and signature are optional (signature defaults to `from`)
   MEMORIES: text reads after "remember when…"; art (optional) = leaves | snow | car | bike | fort
   TONES:  cream | powder | cornflower | delft | mist | airmail
   ========================================================================== */

window.SITE = {
  friend: "Nidu",
  from: "AKKA",
  year: "2026",

  /* 1 ─ YOU'VE GOT MAIL ─────────────────────────────────────────────────── */
  mail: {
    eyebrow: "special delivery · no. 001",
    headingSmall: "You've got",
    headingBig: "mail",
    addressTo: "Miss Nidu",
    addressLines: ["the birthday girl", "wherever she is right now", "planet earth ✦"],
    returnAddress: ["from: someone who misses you", "a few time zones away"],
    postmark: { ring: "WITH LOVE ✦ BIRTHDAY POST ✦", line1: "22 OCT", line2: "2026" },
    stampText: "FIRST CLASS LOVE",
    backNote: "happy birthday, you",
    hintFront: "tap the envelope to turn it over",
    hintBack: "now break the seal",
    hintDone: "tap to read it again",

    letter: {
      date: "22 · 10 · 2026",
      greeting: "Dearest nidu,",
      paragraphs: [
        "If you're reading this, it means I wasn't able to deliver this in person and instead had to rely on the internet to send it.",
        "I'm not able to hug you, annoy you, put cake on your face, or sing very loudly happy birthday all the time, so I did the next best thing: I built this tiny piece of us filled with memories, pictures, and letters for when you need them.",
        "You are the best younger sister EVER okay? I cannot wait to YAP our mouths off when you come in a month (seriously, I'll literally never stop talking). You inspire me to be more ambitious and driven every day and also bring light into the lives of everyone you interact with. You are crazy talented at singing, at math, at drawing, basically at anything you put your mind to. I know you're going to do incredible things in life. Just know that I am always cheering you on from over here.",
        "Have the BESTEST birthday ever!!!!!!!! and I will see you very soon 👀"
      ],
      signoff: "Forever Proud,",
      signature: "AKKA",
      cta: "step inside"
    }
  },

  /* 2 ─ THE NIDU ARCHIVES ───────────────────────────────────────────────── */
  archives: {
    label: "VOL. 01",
    titleSmall: "The",
    titleBig: "Nidu",
    titleItalic: "Archives",
    kicker: "a very serious collection of very unserious moments",
    intro: "hover over a photo (or tap it) for a closer look",
    stamp: "ARCHIVED ✶ 2026",
    notes: [
      "certified menace since day one",
      "exhibit A: the face she makes before a high note",
      "proof that we were always this dramatic",
      "this one goes on the fridge",
      "evidence for the court: she was ALWAYS the funny one",
      "core memory, do not delete"
    ],
    photos: [
      { src: "photos/35f536eb-f4ce-4df3-aa81-e7da3e768165.jpg", thumb: "photos/thumb/35f536eb-f4ce-4df3-aa81-e7da3e768165.jpg", date: "way back",
        caption: "dressed up & peace signs" },
      { src: "photos/d7fad836-f065-4267-9f89-0c09ca6aff1c.jpg", thumb: "photos/thumb/d7fad836-f065-4267-9f89-0c09ca6aff1c.jpg", date: "way back",
        caption: "jasmine in her hair" },
      { src: "photos/img_1016.jpg", thumb: "photos/thumb/img_1016.jpg", date: "oct '17",
        caption: "piggyback era" },
      { src: "photos/img_1556.jpg", thumb: "photos/thumb/img_1556.jpg", date: "jun '22",
        caption: "beach day + travel buddy" },
      { src: "photos/img_2009.jpg", thumb: "photos/thumb/img_2009.jpg", date: "jul '22",
        caption: "first saree?" },
      { src: "photos/img_3687.jpg", thumb: "photos/thumb/img_3687.jpg", date: "mar '23",
        caption: "the clown filter era" },
      { src: "photos/img_3807.jpg", thumb: "photos/thumb/img_3807.jpg", date: "mar '23",
        caption: "leaning on history" },
      { src: "photos/img_4070.jpg", thumb: "photos/thumb/img_4070.jpg", date: "mar '23",
        caption: "she found a hydrangea" },
      { src: "photos/img_4079.jpg", thumb: "photos/thumb/img_4079.jpg", date: "mar '23",
        caption: "umbrella, no rain" },
      { src: "photos/img_4171.jpg", thumb: "photos/thumb/img_4171.jpg", date: "mar '23",
        caption: "road trip mode" },
      { src: "photos/img_5640.jpg", thumb: "photos/thumb/img_5640.jpg", date: "may '23",
        caption: "the whole crew" },
      { src: "photos/img_5810.jpg", thumb: "photos/thumb/img_5810.jpg", date: "jun '23",
        caption: "yes, that's an alligator" },
      { src: "photos/img_6771.jpg", thumb: "photos/thumb/img_6771.jpg", date: "aug '23",
        caption: "that grin" },
      { src: "photos/img_7885-2.jpg", thumb: "photos/thumb/img_7885-2.jpg", date: "sep '23",
        caption: "capitol hill tourist" },
      { src: "photos/img_8479.jpg", thumb: "photos/thumb/img_8479.jpg", wide: true, date: "oct '23",
        caption: "night out, palm trees" },
      { src: "photos/img_8644.jpg", thumb: "photos/thumb/img_8644.jpg", date: "oct '23",
        caption: "floor is lava (we lost)" },
      { src: "photos/img_9747.jpg", thumb: "photos/thumb/img_9747.jpg", date: "nov '23",
        caption: "sparkler magic" },
      { src: "photos/img_0624.jpg", thumb: "photos/thumb/img_0624.jpg", date: "dec '23",
        caption: "candy cane chaos" },
      { src: "photos/img_0870.jpg", thumb: "photos/thumb/img_0870.jpg", date: "dec '23",
        caption: "ice skating, mostly upright" },
      { src: "photos/img_0977.jpg", thumb: "photos/thumb/img_0977.jpg", date: "dec '23",
        caption: "orange sweater season" },
      { src: "photos/img_1236.jpg", thumb: "photos/thumb/img_1236.jpg", date: "jan '24",
        caption: "bundled up for the new year" },
      { src: "photos/img_2513.jpg", thumb: "photos/thumb/img_2513.jpg", wide: true, date: "mar '24",
        caption: "cheek kisses in the car" },
      { src: "photos/img_2550.jpg", thumb: "photos/thumb/img_2550.jpg", date: "mar '24",
        caption: "extreme close-up" },
      { src: "photos/img_0329.jpg", thumb: "photos/thumb/img_0329.jpg", date: "mar '24",
        caption: "a dosa taller than her" },
      { src: "photos/img_0372.jpg", thumb: "photos/thumb/img_0372.jpg", date: "mar '24",
        caption: "mirror selfie, pink era" },
      { src: "photos/img_4153.jpg", thumb: "photos/thumb/img_4153.jpg", date: "may '24",
        caption: "'high school aesthetic'" },
      { src: "photos/img_4205.jpg", thumb: "photos/thumb/img_4205.jpg", date: "jun '24",
        caption: "the hug from behind" },
      { src: "photos/img_6217.jpg", thumb: "photos/thumb/img_6217.jpg", date: "nov '24",
        caption: "pool day pout" },
      { src: "photos/img_6351.jpg", thumb: "photos/thumb/img_6351.jpg", date: "dec '24",
        caption: "dressed for the party" },
      { src: "photos/img_6957.jpg", thumb: "photos/thumb/img_6957.jpg", date: "feb '25",
        caption: "birthday loot" },
      { src: "photos/img_7080.jpg", thumb: "photos/thumb/img_7080.jpg", wide: true, date: "mar '25",
        caption: "snack attack" },
      { src: "photos/img_3224.jpg", thumb: "photos/thumb/img_3224.jpg", date: "mar '25",
        caption: "backseat cuddles" },
      { src: "photos/img_7504.jpg", thumb: "photos/thumb/img_7504.jpg", date: "mar '25",
        caption: "under the waterfall" },
      { src: "photos/img_1988.jpg", thumb: "photos/thumb/img_1988.jpg", date: "mar '25",
        caption: "saddle up" },
      { src: "photos/img_2006.jpg", thumb: "photos/thumb/img_2006.jpg", date: "mar '25",
        caption: "trail ride" },
      { src: "photos/img_8765.jpg", thumb: "photos/thumb/img_8765.jpg", date: "may '25",
        caption: "certificate in hand" },
      { src: "photos/img_9443.jpg", thumb: "photos/thumb/img_9443.jpg", date: "jul '25",
        caption: "coffee first, talk later" },
      { src: "photos/img_0561.jpg", thumb: "photos/thumb/img_0561.jpg", date: "jul '25",
        caption: "matching in pastels" },
      { src: "photos/img_9763.jpg", thumb: "photos/thumb/img_9763.jpg", wide: true, date: "aug '25",
        caption: "stage ready" },
      { src: "photos/img_0830.jpg", thumb: "photos/thumb/img_0830.jpg", date: "nov '25",
        caption: "kayaking through the mangroves" },
      { src: "photos/img_1114.jpg", thumb: "photos/thumb/img_1114.jpg", date: "dec '25",
        caption: "red phone box, no signal" },
      { src: "photos/img_2966.jpg", thumb: "photos/thumb/img_2966.jpg", date: "feb '26",
        caption: "blanket burrito" },
      { src: "photos/img_3860.jpg", thumb: "photos/thumb/img_3860.jpg", date: "mar '26",
        caption: "twirl, twirl, twirl" },
      { src: "photos/img_4182.jpg", thumb: "photos/thumb/img_4182.jpg", date: "apr '26",
        caption: "golden gate daydreams" },
      { src: "photos/img_4494-2.jpg", thumb: "photos/thumb/img_4494-2.jpg", wide: true, date: "may '26",
        caption: "can't stop laughing" },
      { src: "photos/img_5711.jpg", thumb: "photos/thumb/img_5711.jpg", wide: true, date: "jun '26",
        caption: "car selfie, always" },
      { src: "photos/img_5981.jpg", thumb: "photos/thumb/img_5981.jpg", date: "jun '26",
        caption: "girls' day out" },
      { src: "photos/img_6759.jpg", thumb: "photos/thumb/img_6759.jpg", date: "jun '26",
        caption: "climbing the wall" },
      { src: "photos/img_6901.jpg", thumb: "photos/thumb/img_6901.jpg", wide: true, date: "jun '26",
        caption: "the whole family" },
      { src: "photos/img_6979.jpg", thumb: "photos/thumb/img_6979.jpg", date: "jul '26",
        caption: "golden hour gate" },
      { src: "photos/img_7364.jpg", thumb: "photos/thumb/img_7364.jpg", date: "jul '26",
        caption: "green saree, looking away" }
    ]
  },

  /* 3 ─ OPEN WHEN… ──────────────────────────────────────────────────────── */
  openWhen: {
    kicker: "letters for later",
    title: "Open when…",
    intro: "for every day I can't be there in person — break a seal whenever you need me.",
    letters: [
      { when: "you're sad", tone: "powder", seal: "heart", paper: "lined",
        greeting: "My babyyy,",
        body: [
          "Why are you so sad? What happened?",
          "First, you should know that I will absolutely come for anyone who dares to try and hurt you or make you sad- bro they better watch out. If it’s others making you feel this way, know that you are the definition of gaslight, girlboss, gatekeep (in the best possible way ever) and everyone beside you will never match up. Don’t forget who the queen (drama queen most of the time BUT STILL) is!",
          "And if it isn’t others making you sad and it’s yourself obsessive over small things or just worrying about others, know that it’s important to be kind to yourself. Don’t compare yourself to the successes of others because everyone is one their own path and you already are successful in yours. You are the sweetest, kindest, smartest, emotionally intelligent, funniest - second only to me ;) - prettiest, AMAZING person ever and you should never forget that. Treat every “failure” as a success in pushing yourself past your limit. Shift your perspective and you’ll see that the grass was never greener on the other side, it blooms wherever you walk.",
          "ALSO WHY ARE YOU READING THIS LETTER WHEN SAD AND NOT CALLING ME RAT????? I EXPECT A CALL VERY SOON SO THAT I CAN HEAR YOU RANT ALL ABOUT THIS!!!!!!! DON’T ISOLATE YOURSELF OKAY??? IM ALWAYS HERE FOR YOU. ALWAYS.",
          "I LOVE YOU MOST, I LOST THE GAME."
        ],
        signoff: "UR FAV PERSON,", signature: "AKKA" },
      { when: "you miss me", tone: "cream", seal: "butterfly", paper: "airmail",
        greeting: "",
        body: [
          "AWWWW im missing yoou so much writing this letter <3 and im guessing you miss me to if you’re reading this. well well well im gonna assume you tried to call me already and it didnt work (IM SORRY I DIDNT PICK UP I WILL CALL IMMEDIATELY MY SHAYLA). BUT if you haven’t called me, bro what are you doing??? You know whats the best cure for missing me? Me 😘😘. Call mee bro!!!!",
          "Okay so now im RLLY sorry if I STILL haven’t picked up (something has gone seriously wrong or my DND is acting up again). In this case, know that even though I’m thousands of miles away, I am always right next to you in spirit, okay? I am always right there next to you cheering you on or consoling you or telling you to lock in (you know that small sound in your mind when you’re doomscrolling tellign you to lock in? that’s actually me, now you know). There is nowhere you could possibly be that I am not right there with you or unable to reach you.",
          "We’ll always have our late night chat sessions, except they have just been rescheduled to a different time now and we’ll continue our conversation right where we paused it. You know what they always say, distance makes the heart grow fonder. So that means… I LOVE YOU MOSTER I LOST THE GAME",
          "MY FAV BABYYYYYYYYY DONT FEEL DOWN OKAY??? DONT WORRY, BE HAPPY :)))))"
        ],
        signoff: "", signature: "AKKA" },
      { when: "you doubt yourself", tone: "delft", seal: "N", paper: "plain",
        greeting: "Bro. What.",
        body: [
          "Why are you even opening this when you genuinely are one of the most impressive people I know. And no, I’m not saying that because I’m obligated to- you know I speak my mind (a little too much some times LOLOL). I know that you are seriously cracked. You’re incredibly talented, not just in academics (how many people can say they got a 100% in math??) but also in music (my personal music player 😘), emotional intelligence (literally everyone that meets you always says you have wisdom beyond your years bro, that’s because you are hyper aware of everyone and working to support them all), incredibly personable and genuinely kind too.",
          "So, clearly, this isn’t having to do with what you actually are (bc I’ve already proved ur insane, in a good way), but rather a question of why you feel less accomplished. Whenever you catch yourself feeling like this there’s always two foolproof strats.",
          "1. Use this moment to ignite the fire inside yourself. What are you working towards???? Being successful in school????? A law degree??? Creating your own firm?????? Every moment that you spend lamenting on what you have or haven’t done is a moment that you could spend working towards that goal. And if that doesn’t scare you, the possibility of what you’re missing out on, look at others beside you. Not at their accomplishments, but at their drive. If you are jealous of anything, be jealous at how they push themselves relentlessly, at their 100% focus, at their increasing ambition. The more you spend time thinking about something that consumes your thoughts, that becomes your habit. IGNITE THIS FIRE. WALLOWING IN PITY DOES NOTHING. WORKING WILL GET YOU TO WHERE YOU WANT TO GO.",
          "2. Do something small. Why do you doubt yourself? Because you think you don’t have the capabilities or the skill to do it successfully? Let’s prove you wrong. Start something small. Finish a small painting, write a poem, do something unexpected !!! And finish it !!!! Prove to yourself that you can do anything. This sparks a flame in you which you kindle with your next activity. And soon, you have a raging fire with the doubts fading into the small shadows.",
          "2 foolproof strats i’ve given (okay 3, if you count calling me to light the fire under your bum as another strat). MOST IMPORTANTLY, WE ALL BELIEVE IN YOU. WE KNOW HOW AMAZING YOU ARE AND HOW STRONG YOU ARE. YOU ARE CAPABLE AND DESERVING OKAY? OKAY"
        ],
        signoff: "", signature: "AKKA" }
    ]
  },

  /* 4 ─ REMEMBER WHEN… ──────────────────────────────────────────────────── */
  rememberWhen: {
    kicker: "a jar of tiny moments",
    title: "Remember when…",
    intro: "every note in this jar is a moment I still think about. shake it.",
    tag: "remember when…",
    button: "pull a memory",
    again: "pull another",
    empty: "tap the jar and pull out a memory",
    memories: [
      { text: "we scraped leaves and jumped in them while making a cheerleader choreo at periamma's house", art: "leaves" },
      { text: "we made snow angels in the backyard of aparna athai", art: "snow" },
      { text: "we created our iconic handshake / song in the car ride to costa rica", art: "car" },
      { text: "we biked on the beach with amma in marco islands", art: "bike" },
      { text: "we made forts using the bunk bed in the room", art: "fort" }
    ]
  },

  /* 5 ─ QUIZ ─────────────────────────────────────────────────────────── */
  // Multiple choice: options + answer (index, starting at 0).
  // Typed: type: "text", answer: "the word", accept: [other spellings that also count].
  // right / wrong: optional per-question reactions (otherwise a random one from the lists below).
  quiz: {
    enabled: true,
    kicker: "a tiny quiz",
    title: "How well do you know us?",
    intro: "four questions. no cheating (looking at you).",
    right: ["yesss obviously", "correct, as expected", "ok you DO know us"],
    wrong: ["excuse me??", "wow. just wow.", "we need to talk"],
    questions: [
      { q: "What do we call the brain?", type: "text", answer: "kidney", accept: ["kidneys", "the kidney"] },
      { q: "What is my favorite color?", options: ["purple", "dark blue", "teal", "fuchsia"], answer: 0 },
      { q: "Where did we see the guy who swam back and forth beside us? (you know what I'm talking about)",
        options: ["siesta key beach", "alaska cruise pool", "our pool (that was arun)", "Likki Tikki"], answer: 0 },
      { q: "Who is most likely to be late?", options: ["Nidu", "Me", "Both of us, together", "Time is a construct"], answer: 1 }
    ],
    results: [
      { min: 4, stamp: "KNOWS US BEST ✶", title: "4 for 4. obviously.", message: "no one knows us like you do." },
      { min: 2, stamp: "PRETTY GOOD ✶", title: "not bad at all", message: "a couple of slip-ups, but you're still my favourite." },
      { min: 0, stamp: "EXCUSE ME??", title: "who even are you??", message: "we're having a serious talk when you get here." }
    ]
  },

  /* FOOTER ─────────────────────────────────────────────────────────────── */
  footer: {
    big: "Happy birthday, Nidu",
    line: "Wishing you the best for ever and ever,",
    signature: "your big sister <3"
  }
};
