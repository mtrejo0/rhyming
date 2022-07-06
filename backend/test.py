import pronouncing
import re 
import random
from termcolor import colored
from colr import color
import syllables

# test_str = """
# I miss you in the morning;
# I miss you late at night.
# Just to think about you
# Is my joy and my delight.

# I can't wait to see you;
# Please hurry and come back.
# You always make me happy;
# You have that special knack!
# """

test_str = """
And this is rigamortus and it's gorgeous when you die
Ali recorded, and I'm Morpheus, the matrix of my mind
I'm out the orbit, you an orphan and a hairdresser combined
I'm on the toilet when I rhyme, if you the shit then I decline
I climax where you begin and then I end on Cloud 9
And that's important when you morph into a angel in the sky
And don't be forging all my signatures, my listeners reply
And tell me that you biting style, you got a hell of an appetite
And I'mma be here for a while just buckle up before the ride
Or knuckle up, if you could fight, we always making 'em duck or die
A suit and tie is suitable and usual in suicide
CSI just might investigate this fucking parasite
(He dead, amen) That's what they telling me
Aim it at your celebrity, this is studio felony
Ferragami so many and cool enough for the 70's
Nigga, payback's a bitch and bitch you been living in debt with me
Dead 'em all and especially, leave a call on his mother voicemail
To say that he rest in peace, bigger chopper the recipe
Wrestling, that's irrelevant, rather rest at your residence
Whistling to the melody, couldn't think of a better D
Better be on your P and Q, it's just me Jay Rock, Soul and Q
Solar system and barbecue, nothing else you can do
"""


# test_str = """
# I'm SPM you know my name
# I'm the one that came up out the dope game
# I've payed my dues and kept my cool
# I'm the one that told your kid to stay in school
# I'm from the streets thank god for rap
# I creep through my hood in the smoke gray 'llac
# Contradictions on my chest, Versace on my clothes
# I got too many too many heh YO
# I'm shakin bakin cookies turnin rookies into vets
# I used to see my dreams through a foggy pyrex
# My lex is outside plus I got a 64
# But my benz is wrapped up around a telephone pole
# I'm drippin candy wet and I'm swangin 84s
# Nothin but the screw bangin in my radio
# I'm blowin this mary and im sippin on sherry
# Give my homies mama money for his commissary
# """

# test_str = """

# i quit school and its not because im lazy 
# im just not the socian and cant this life is crazy

# """

test_str = test_str.lower()

clean_str = re.sub(r'[^\w\s]', '', test_str) 

word_list = clean_str.split()


word_set = set(word_list)

rhyme_dict = {}
for word in word_set:
    rhyme_dict[word] = set(pronouncing.rhymes(word))

groupings = {}
for word in word_set:
    groupings[word] = set()
    rhyming_words = rhyme_dict[word]
    other_words = word_set.difference({word})
    for other_word in other_words:
        if other_word in rhyming_words:
            groupings[word].add(other_word)
        if other_word[-3:] == word[-3:]:
            groupings[word].add(other_word)

groups = set()
for word in groupings:
    rhymes = list(groupings[word])+[word]
    rhymes.sort()
    groups.add(tuple(rhymes))

colors = [
    (255, 0, 0),
    (0, 255, 0),
    (0, 0, 255),
    (255, 0, 255),
    (255, 255, 0),
    (0, 255, 255),
    (255, 160, 122),
    (240, 128, 128),
    (255, 105, 180),
    (255, 182, 193),
    (255, 160, 122),
    (255, 140, 0),
    (255, 69, 0),
    (255, 215, 0),
    (240, 230, 140),
    (186, 85, 211),
    (124, 252, 0)
]

for _ in range(100):
    r = random.randint(100, 255)
    g = random.randint(100, 225)
    b = random.randint(100, 225)
    col = (r,g,b)
    colors.append(col)

color_map = {}

for group in groups:
    if len(group) > 1:
        col = colors.pop(0)
        for word in group:
            color_map[word] = col
    else:
        word = group[0]
        color_map[word] = 'white'

syllable_count = {}
count = 0
for i, word in enumerate(word_list):
    print(color(word, fore=color_map[word], back=(0, 0, 0)), end=' ')
    if word not in syllable_count:
        syllable_count[word] = syllables.estimate(word)
    count += syllable_count[word]
    if count > 10:
        print()
        count = 0 
    