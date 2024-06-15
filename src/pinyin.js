// Regex to match accent-form or number-form pinyin. It also match special er cases (e.g. háir).
// Note: // ?! is look ahead (not match), ?= looks ahead (match), ?<! look behind (not match), ?<= look behind (match), ?: don't capture this group
const RE_PINYIN = /(?<initial>[bdfghjklmnpqrtwxy]|ch?|sh?|zh?)?(?<final_a>ao|ai?|ei?|iao?|iu|io|ie?|ou?|uai?|ue|uo|ui?|üe?|ve?)(?<final_b>(?<!ai|ei|ao|ou|ie|iu|uo|uai|ui|üe|ve)(?:ng?(?![aeiouü])))?(?<r>r(?![aeiouü]))?(?<tone>[0-5])?[']?/ig;

// Regex to match a number-form pinyin, and more importantly help to know where to put the accent.
const RE_PINYIN1 = /([AEIOUaeiou]ng?|a[ino]r|[AEae]i|[Aa]o|[Ee]r|[Oo]u|[AEIOUaeioruÜü])(r)?([0-5])/g;

// Regex to identity where to put apostrophe to separate 2 pinyins.
const RE_APOS = /([aeginoruü])([1-5])([AEIOUaeiouÜü])/g;

const MAP = new Map([
	['A1', 'Ā'], ['A2', 'Á'], ['A3', 'Ǎ'], ['A4', 'À'], ['A5', 'A'],
	['E1', 'Ē'], ['E2', 'É'], ['E3', 'Ě'], ['E4', 'È'], ['E5', 'E'],
	['I1', 'Ī'], ['I2', 'Í'], ['I3', 'Ǐ'], ['I4', 'Ì'], ['I5', 'I'],
	['O1', 'Ō'], ['O2', 'Ó'], ['O3', 'Ǒ'], ['O4', 'Ò'], ['O5', 'O'],
	['U1', 'Ū'], ['U2', 'Ú'], ['U3', 'Ǔ'], ['U4', 'Ù'], ['U5', 'U'],
	['Ü1', 'Ǖ'], ['Ü2', 'Ǘ'], ['Ü3', 'Ǚ'], ['Ü4', 'Ǜ'], ['Ü5', 'Ü'],
	['a1', 'ā'], ['a2', 'á'], ['a3', 'ǎ'], ['a4', 'à'], ['a5', 'a'],
	['e1', 'ē'], ['e2', 'é'], ['e3', 'ě'], ['e4', 'è'], ['e5', 'e'],
	['i1', 'ī'], ['i2', 'í'], ['i3', 'ǐ'], ['i4', 'ì'], ['i5', 'i'],
	['o1', 'ō'], ['o2', 'ó'], ['o3', 'ǒ'], ['o4', 'ò'], ['o5', 'o'],
	['u1', 'ū'], ['u2', 'ú'], ['u3', 'ǔ'], ['u4', 'ù'], ['u5', 'u'],
	['ü1', 'ǖ'], ['ü2', 'ǘ'], ['ü3', 'ǚ'], ['ü4', 'ǜ'], ['ü5', 'ü'],
	['r5', 'r'],
]);

const REVERSE_MAP = new Map([...MAP].map(([a, b]) => [b, a]));

/**
 * Converts a number-form or accent-form pinyin to number-form pinyin. This
 * method only tries to convert recognizable pinyin to number-form pinyin,
 * leaving other punctuation marks and spaces untouched.
 *
 * @param {string} pinyin 
 * @returns {string}
 */
export function convertToPinyin1(pinyin) {
    const cleanPinyin = pinyin.replaceAll('U:', 'V').replaceAll('u:', 'v');

    // remove all accents (e.g. nǚ => nü, bào => bao)
    let normalized = cleanPinyin;
    for (const [key, value] of REVERSE_MAP) {
        normalized = normalized.replaceAll(key, value[0]);
    }
    const substitutes = [];
    let m;
    while(m = RE_PINYIN.exec(normalized)) {
        let {groups: {initial, final_a, final_b, r, tone}} = m;
        if (!tone || tone === '0') {
            tone = '5';
        }
        const original = cleanPinyin.slice(m.index, m.index + m[0].length);
        for (const c of original) {
            const charTone = REVERSE_MAP.get(c)?.[1];
            if (charTone && charTone !== '5' && charTone !== '0') {
                tone = charTone;
                break;
            }
        }
        const isEr = !initial && final_a === 'e' && !final_b && r === 'r';
        const hasR = r === 'r' && !isEr;
        initial = initial ?? '';
        final_a = final_a.replace('ü', 'v');
        final_b = isEr ? 'r' : final_b ?? '';
        r = hasR ? 'r' : '';
        let sub = initial + final_a  + final_b + tone + r;
        if (hasR) {
            let nextChar = cleanPinyin.charAt(m.index + m[0].length);
            if (REVERSE_MAP.has(nextChar)) {
                nextChar = REVERSE_MAP.get(nextChar);
            }
            if (nextChar && nextChar.match(/[aeiouüv]/i)) {
                sub += ' ';
            }
        }
        substitutes.push({
            index: m.index,
            length: m[0].length,
            sub,
        });
    }
    substitutes.reverse();
    let result = cleanPinyin;
    for (const substitute of substitutes) {
        result = result.slice(0, substitute.index) + substitute.sub + result.slice(substitute.index + substitute.length);
    }
    return result;
}

/**
 * Converts a number-form or accent-form pinyin to accent-form pinyin. This
 * method only tries to convert recognizable pinyin to accent-form pinyin,
 * leaving other punctuation marks and spaces untouched.
 *
 * @param {string} pinyin1
 * @returns {string}
 */
export function convertToPinyin(pinyin1) {
    return pinyin1
        .replaceAll('u:', 'ü')
        .replaceAll('U:', 'Ü')
        .replaceAll('v', 'ü')
        .replaceAll('V', 'Ü')
        .replaceAll(RE_APOS, (match, p1, p2, p3) => {
            return p1 + p2 + '\'' + p3;
        })
        .replaceAll(RE_PINYIN1, (match, p1, p2, p3) => {
            if (p3 === '0') {
                p3 = '5';
            }
            const key = p1[0] + p3;
            const c = MAP.get(key);
            const pinyin = c ? c + p1.slice(1) : match;
            return pinyin + (p2 ? 'r' : '');
        });
}

/**
 * Converts pinyin to a trimmed lowercase number-form pinyin, remove all
 * characters that are not part of a pinyin. The aim of this method is to
 * produce consistent pinyin for comparison.
 *
 * Example: 女孩儿: nv3 hai2 r.
 *
 * @param {string} pinyin 
 * @returns {string}
 */
export function normalizePinyin1(pinyin) {
    if (!pinyin) {
		return '';
	}
    const pinyin1 = convertToPinyin1(pinyin);
    const normPinyin1 = pinyin1
        .toLowerCase()
        .replaceAll(/([1-5])[^a-z]*/g, '$1 ')
        .replaceAll(/(r)[^1-5a-z]+/g, '$1 ')
        .replaceAll(/(r)([^1-5aeiouv ])/g, '$1 $2')
        .trim();
    return normPinyin1;
}

/**
 * Converts pinyin to a trimmed lowercase accent-form pinyin, remove all
 * characters that are not part of a pinyin. The aim of this method is to
 * produce consistent pinyin for comparison.
 * 
 * Example: 女孩儿: nǚ hái r. The r is separated from hái so that the group of
 * sounds (nǚ, hái, r) can be matched to the group of characters (女, 孩, 儿).
 *
 * @param {string} pinyin 
 * @returns {string}
 */
export function normalizePinyin(pinyin) {
    return convertToPinyin(normalizePinyin1(pinyin));
}

/**
 * Compact normalized pinyin by removing spaces.
 *
 * @param {string} pinyin
 * @returns {string}
 */
export function compactPinyin1(pinyin) {
    return normalizePinyin1(pinyin).replaceAll(/r ([aeiouv])/g, 'r\'$1').replaceAll(' ', '');
}

/**
 * Compact normalized pinyin by removing spaces.
 *
 * @param {string} pinyin
 * @returns {string}
 */
export function compactPinyin(pinyin) {
    return convertToPinyin(compactPinyin1(pinyin));
}

/**
 * Amazon Polly pinyin: https://docs.aws.amazon.com/polly/latest/dg/ph-table-mandarin.html.
 * Note: neutral tone: 0 instead of 5. Syllable boundary: - instead of space.
 * For er hua: xianr4 instead of xian4 r. For er3, it's still er3.
 * For ǚ : the doc only mentions yu2, but it understand v (e.g. nv3).
 *
 * @param {string} pinyin
 * @returns {string}
 */
export function pinyinForPolly(pinyin) {
    const normPinyin1 = normalizePinyin1(pinyin);
    return normPinyin1
        .replaceAll('5', '0')
        .replaceAll(/([a-z])([0-4]) r($| )/g, '$1r$2$3')
        .replaceAll(' ', '-');
}
