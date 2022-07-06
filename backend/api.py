import re
import pronouncing
from collections import Counter

class API():

    def __init__(self):
        self.cachedStopWords = set(["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"])

    def get_rhymes(self, text):
        text = text.lower()

        clean_str = re.sub(r'[^\w\s]', '', text) 

        word_list = re.findall(r"[\w']+", clean_str)

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

        groups = list(groups)
        groups = sorted(groups, key = lambda x: len(x), reverse=True)
        return groups

    def get_ngrams(self, text):
        text = text.lower()
        text = re.sub(r'[^\w\s]','',text)

        text = [word for word in text.split() if not word in self.cachedStopWords]

        one_gram = Counter(text).most_common(10)
        two_gram = Counter(self.grouper(tweets, 2)).most_common(10)
        three_gram = Counter(self.grouper(tweets, 3)).most_common(10)

        return {
            'one' : one_gram,
            'two' : two_gram,
            'three' : three_gram 
        }
    
    def get_frequency(self, text):
        text = text.lower()
        text = re.sub(r'[^\w\s]','',text)

        text = [word for word in text.split() if not word in self.cachedStopWords]
        
        
        words = [(k, v) for k, v in Counter(text).items()]
        return sorted(words, key=lambda x: x[1], reverse=True)

    def get_syllable_breaks(self, text, n = 4):
        text = text.lower()
        text = re.sub(r'[^\w\s]','',text)
        words = text.split()
        print(words)

        splits = []
        bar = []
        
        count = 0
        last_part = None
        last_short = False
        
        for word in words:
            print(word, count, last_part)
            if last_part:
                last_part = "-"+"".join(last_part)
                bar.append(last_part)
                last_part = None
                
            syllables = self.syllable_count(word)

            print(word, syllables)

            if syllables == 1 and word in self.cachedStopWords:
                if last_short and len(bar) > 0:
                    bar[-1] += " " + word
                    last_stop = False
                    continue
                last_short = True
            else:
                last_short = False

            if count + syllables <= n:
                bar.append(word)
                count += syllables

            if count == n:
                splits.append(bar)
                bar = []
            
            if count + syllables > n:
                fill = n - count
                overflow = syllables - fill

                split_word = self.split_word(word, syllables)
                first_part = "".join(split_word[:fill])+"-"
                bar.append(first_part)
                splits.append(bar)
                bar = []
                count = 0

                left_syllables = overflow - fill
                last_part = split_word[left_syllables:]
                
                # while(len(last_part) > n):
                #     first_part = "-"+"".join(split_word[:n])+"-"
                #     last_part = last_part[n:]
                #     bar.append(first_part)
                # count = 0
        
        print(splits)
                
        return splits

    def split_word(self, word, count):
        space = (len(word)//count) +1
        split = []
        last = count
        for i in range(len(word)):
            if i % space == 0:
                split.append(word[i:i+space])
                last = 0
        
        return split

        
    def syllable_count(self, word):
        word = word.lower()
        count = 0
        vowels = "aeiouy"
        if word[0] in vowels:
            count += 1
        for index in range(1, len(word)):
            if word[index] in vowels and word[index - 1] not in vowels:
                count += 1
        if word.endswith("e"):
            count -= 1
        if count == 0:
            count += 1
        return count
