import assert from 'assert';
import { compactPinyin, convertToPinyin, convertToPinyin1, normalizePinyin, normalizePinyin1, pinyinForPolly } from "pinyin";

const SINGLE_PINYINS = [
    ['ǎ', 'a3'],
    ['ǎi', 'ai3'],
    ['ǎn', 'an3'],
    ['ǎng', 'ang3'],
    ['ǎo', 'ao3'],
    ['bǎ', 'ba3'],
    ['bǎi', 'bai3'],
    ['bǎn', 'ban3'],
    ['bǎng', 'bang3'],
    ['bǎo', 'bao3'],
    ['běi', 'bei3'],
    ['běn', 'ben3'],
    ['běng', 'beng3'],
    ['bǐ', 'bi3'],
    ['biǎn', 'bian3'],
    ['biǎo', 'biao3'],
    ['biě', 'bie3'],
    ['bǐn', 'bin3'],
    ['bǐng', 'bing3'],
    ['bǒ', 'bo3'],
    ['bǔ', 'bu3'],
    ['cǎ', 'ca3'],
    ['cǎi', 'cai3'],
    ['cǎn', 'can3'],
    ['cǎng', 'cang3'],
    ['cǎo', 'cao3'],
    ['cě', 'ce3'],
    ['cěi', 'cei3'],
    ['cěn', 'cen3'],
    ['cěng', 'ceng3'],
    ['chǎ', 'cha3'],
    ['chǎi', 'chai3'],
    ['chǎn', 'chan3'],
    ['chǎng', 'chang3'],
    ['chǎo', 'chao3'],
    ['chě', 'che3'],
    ['chěn', 'chen3'],
    ['chěng', 'cheng3'],
    ['chǐ', 'chi3'],
    ['chǒng', 'chong3'],
    ['chǒu', 'chou3'],
    ['chǔ', 'chu3'],
    ['chuǎ', 'chua3'],
    ['chuǎi', 'chuai3'],
    ['chuǎn', 'chuan3'],
    ['chuǎng', 'chuang3'],
    ['chuǐ', 'chui3'],
    ['chǔn', 'chun3'],
    ['chuǒ', 'chuo3'],
    ['cǐ', 'ci3'],
    ['cǒng', 'cong3'],
    ['cǒu', 'cou3'],
    ['cǔ', 'cu3'],
    ['cuǎn', 'cuan3'],
    ['cuǐ', 'cui3'],
    ['cǔn', 'cun3'],
    ['cuǒ', 'cuo3'],
    ['dǎ', 'da3'],
    ['dǎi', 'dai3'],
    ['dǎn', 'dan3'],
    ['dǎng', 'dang3'],
    ['dǎo', 'dao3'],
    ['dě', 'de3'],
    ['děi', 'dei3'],
    ['děn', 'den3'],
    ['děng', 'deng3'],
    ['dǐ', 'di3'],
    ['diǎn', 'dian3'],
    ['diǎo', 'diao3'],
    ['diě', 'die3'],
    ['dǐng', 'ding3'],
    ['diǔ', 'diu3'],
    ['dǒng', 'dong3'],
    ['dǒu', 'dou3'],
    ['dǔ', 'du3'],
    ['duǎn', 'duan3'],
    ['duǐ', 'dui3'],
    ['dǔn', 'dun3'],
    ['duǒ', 'duo3'],
    ['ě', 'e3'],
    ['ěi', 'ei3'],
    ['ěn', 'en3'],
    ['ěng', 'eng3'],
    ['ěr', 'er3'],
    ['fǎ', 'fa3'],
    ['fǎn', 'fan3'],
    ['fǎng', 'fang3'],
    ['fěi', 'fei3'],
    ['fěn', 'fen3'],
    ['fěng', 'feng3'],
    ['fǒ', 'fo3'],
    ['fǒu', 'fou3'],
    ['fǔ', 'fu3'],
    ['gǎ', 'ga3'],
    ['gǎi', 'gai3'],
    ['gǎn', 'gan3'],
    ['gǎng', 'gang3'],
    ['gǎo', 'gao3'],
    ['gě', 'ge3'],
    ['gěi', 'gei3'],
    ['gěn', 'gen3'],
    ['gěng', 'geng3'],
    ['gǒng', 'gong3'],
    ['gǒu', 'gou3'],
    ['gǔ', 'gu3'],
    ['guǎ', 'gua3'],
    ['guǎi', 'guai3'],
    ['guǎn', 'guan3'],
    ['guǎng', 'guang3'],
    ['guǐ', 'gui3'],
    ['gǔn', 'gun3'],
    ['guǒ', 'guo3'],
    ['hǎ', 'ha3'],
    ['hǎi', 'hai3'],
    ['hǎn', 'han3'],
    ['hǎng', 'hang3'],
    ['hǎo', 'hao3'],
    ['hě', 'he3'],
    ['hěi', 'hei3'],
    ['hěn', 'hen3'],
    ['hěng', 'heng3'],
    ['hǒng', 'hong3'],
    ['hǒu', 'hou3'],
    ['hǔ', 'hu3'],
    ['huǎ', 'hua3'],
    ['huǎi', 'huai3'],
    ['huǎn', 'huan3'],
    ['huǎng', 'huang3'],
    ['huǐ', 'hui3'],
    ['hǔn', 'hun3'],
    ['huǒ', 'huo3'],
    ['jǐ', 'ji3'],
    ['jiǎ', 'jia3'],
    ['jiǎn', 'jian3'],
    ['jiǎng', 'jiang3'],
    ['jiǎo', 'jiao3'],
    ['jiě', 'jie3'],
    ['jǐn', 'jin3'],
    ['jǐng', 'jing3'],
    ['jiǒng', 'jiong3'],
    ['jiǔ', 'jiu3'],
    ['jǔ', 'ju3'],
    ['juǎn', 'juan3'],
    ['juě', 'jue3'],
    ['jǔn', 'jun3'],
    ['kǎ', 'ka3'],
    ['kǎi', 'kai3'],
    ['kǎn', 'kan3'],
    ['kǎng', 'kang3'],
    ['kǎo', 'kao3'],
    ['kě', 'ke3'],
    ['kěi', 'kei3'],
    ['kěn', 'ken3'],
    ['kěng', 'keng3'],
    ['kǒng', 'kong3'],
    ['kǒu', 'kou3'],
    ['kǔ', 'ku3'],
    ['kuǎ', 'kua3'],
    ['kuǎi', 'kuai3'],
    ['kuǎn', 'kuan3'],
    ['kuǎng', 'kuang3'],
    ['kuǐ', 'kui3'],
    ['kǔn', 'kun3'],
    ['kuǒ', 'kuo3'],
    ['lǎ', 'la3'],
    ['lǎi', 'lai3'],
    ['lǎn', 'lan3'],
    ['lǎng', 'lang3'],
    ['lǎo', 'lao3'],
    ['lě', 'le3'],
    ['lěi', 'lei3'],
    ['lěng', 'leng3'],
    ['lǐ', 'li3'],
    ['liǎ', 'lia3'],
    ['liǎn', 'lian3'],
    ['liǎng', 'liang3'],
    ['liǎo', 'liao3'],
    ['liě', 'lie3'],
    ['lǐn', 'lin3'],
    ['lǐng', 'ling3'],
    ['liǔ', 'liu3'],
    ['lǒng', 'long3'],
    ['lǒu', 'lou3'],
    ['lǔ', 'lu3'],
    ['luǎn', 'luan3'],
    ['lǔn', 'lun3'],
    ['luǒ', 'luo3'],
    ['lǚ', 'lv3'],
    ['lüě', 'lve3'],
    ['mǎ', 'ma3'],
    ['mǎi', 'mai3'],
    ['mǎn', 'man3'],
    ['mǎng', 'mang3'],
    ['mǎo', 'mao3'],
    ['mě', 'me3'],
    ['měi', 'mei3'],
    ['měn', 'men3'],
    ['měng', 'meng3'],
    ['mǐ', 'mi3'],
    ['miǎn', 'mian3'],
    ['miǎo', 'miao3'],
    ['miě', 'mie3'],
    ['mǐn', 'min3'],
    ['mǐng', 'ming3'],
    ['miǔ', 'miu3'],
    ['mǒ', 'mo3'],
    ['mǒu', 'mou3'],
    ['mǔ', 'mu3'],
    ['nǎ', 'na3'],
    ['nǎi', 'nai3'],
    ['nǎn', 'nan3'],
    ['nǎng', 'nang3'],
    ['nǎo', 'nao3'],
    ['ně', 'ne3'],
    ['něi', 'nei3'],
    ['něn', 'nen3'],
    ['něng', 'neng3'],
    ['nǐ', 'ni3'],
    ['niǎn', 'nian3'],
    ['niǎng', 'niang3'],
    ['niǎo', 'niao3'],
    ['niě', 'nie3'],
    ['nǐn', 'nin3'],
    ['nǐng', 'ning3'],
    ['niǔ', 'niu3'],
    ['nǒng', 'nong3'],
    ['nǒu', 'nou3'],
    ['nǔ', 'nu3'],
    ['nuǎn', 'nuan3'],
    ['nuǒ', 'nuo3'],
    ['nǚ', 'nv3'],
    ['nüě', 'nve3'],
    ['ǒ', 'o3'],
    ['ǒu', 'ou3'],
    ['pǎ', 'pa3'],
    ['pǎi', 'pai3'],
    ['pǎn', 'pan3'],
    ['pǎng', 'pang3'],
    ['pǎo', 'pao3'],
    ['pěi', 'pei3'],
    ['pěn', 'pen3'],
    ['pěng', 'peng3'],
    ['pǐ', 'pi3'],
    ['piǎn', 'pian3'],
    ['piǎo', 'piao3'],
    ['piě', 'pie3'],
    ['pǐn', 'pin3'],
    ['pǐng', 'ping3'],
    ['pǒ', 'po3'],
    ['pǒu', 'pou3'],
    ['pǔ', 'pu3'],
    ['qǐ', 'qi3'],
    ['qiǎ', 'qia3'],
    ['qiǎn', 'qian3'],
    ['qiǎng', 'qiang3'],
    ['qiǎo', 'qiao3'],
    ['qiě', 'qie3'],
    ['qǐn', 'qin3'],
    ['qǐng', 'qing3'],
    ['qiǒng', 'qiong3'],
    ['qiǔ', 'qiu3'],
    ['qǔ', 'qu3'],
    ['quǎn', 'quan3'],
    ['quě', 'que3'],
    ['qǔn', 'qun3'],
    ['rǎn', 'ran3'],
    ['rǎng', 'rang3'],
    ['rǎo', 'rao3'],
    ['rě', 're3'],
    ['rěn', 'ren3'],
    ['rěng', 'reng3'],
    ['rǐ', 'ri3'],
    ['rǒng', 'rong3'],
    ['rǒu', 'rou3'],
    ['rǔ', 'ru3'],
    ['ruǎ', 'rua3'],
    ['ruǎn', 'ruan3'],
    ['ruǐ', 'rui3'],
    ['rǔn', 'run3'],
    ['ruǒ', 'ruo3'],
    ['sǎ', 'sa3'],
    ['sǎi', 'sai3'],
    ['sǎn', 'san3'],
    ['sǎng', 'sang3'],
    ['sǎo', 'sao3'],
    ['sě', 'se3'],
    ['sěn', 'sen3'],
    ['sěng', 'seng3'],
    ['shǎ', 'sha3'],
    ['shǎi', 'shai3'],
    ['shǎn', 'shan3'],
    ['shǎng', 'shang3'],
    ['shǎo', 'shao3'],
    ['shě', 'she3'],
    ['shěi', 'shei3'],
    ['shěn', 'shen3'],
    ['shěng', 'sheng3'],
    ['shǐ', 'shi3'],
    ['shǒu', 'shou3'],
    ['shǔ', 'shu3'],
    ['shuǎ', 'shua3'],
    ['shuǎi', 'shuai3'],
    ['shuǎn', 'shuan3'],
    ['shuǎng', 'shuang3'],
    ['shuǐ', 'shui3'],
    ['shǔn', 'shun3'],
    ['shuǒ', 'shuo3'],
    ['sǐ', 'si3'],
    ['sǒng', 'song3'],
    ['sǒu', 'sou3'],
    ['sǔ', 'su3'],
    ['suǎn', 'suan3'],
    ['suǐ', 'sui3'],
    ['sǔn', 'sun3'],
    ['suǒ', 'suo3'],
    ['tǎ', 'ta3'],
    ['tǎi', 'tai3'],
    ['tǎn', 'tan3'],
    ['tǎng', 'tang3'],
    ['tǎo', 'tao3'],
    ['tě', 'te3'],
    ['těi', 'tei3'],
    ['těng', 'teng3'],
    ['tǐ', 'ti3'],
    ['tiǎn', 'tian3'],
    ['tiǎo', 'tiao3'],
    ['tiě', 'tie3'],
    ['tǐng', 'ting3'],
    ['tǒng', 'tong3'],
    ['tǒu', 'tou3'],
    ['tǔ', 'tu3'],
    ['tuǎn', 'tuan3'],
    ['tuǐ', 'tui3'],
    ['tǔn', 'tun3'],
    ['tuǒ', 'tuo3'],
    ['wǎ', 'wa3'],
    ['wǎi', 'wai3'],
    ['wǎn', 'wan3'],
    ['wǎng', 'wang3'],
    ['wěi', 'wei3'],
    ['wěn', 'wen3'],
    ['wěng', 'weng3'],
    ['wǒ', 'wo3'],
    ['wǔ', 'wu3'],
    ['xǐ', 'xi3'],
    ['xiǎ', 'xia3'],
    ['xiǎn', 'xian3'],
    ['xiǎng', 'xiang3'],
    ['xiǎo', 'xiao3'],
    ['xiě', 'xie3'],
    ['xǐn', 'xin3'],
    ['xǐng', 'xing3'],
    ['xiǒng', 'xiong3'],
    ['xiǔ', 'xiu3'],
    ['xǔ', 'xu3'],
    ['xuǎn', 'xuan3'],
    ['xuě', 'xue3'],
    ['xǔn', 'xun3'],
    ['yǎ', 'ya3'],
    ['yǎn', 'yan3'],
    ['yǎng', 'yang3'],
    ['yǎo', 'yao3'],
    ['yě', 'ye3'],
    ['yǐ', 'yi3'],
    ['yǐn', 'yin3'],
    ['yǐng', 'ying3'],
    ['yǒng', 'yong3'],
    ['yǒu', 'you3'],
    ['yǔ', 'yu3'],
    ['yuǎn', 'yuan3'],
    ['yuě', 'yue3'],
    ['yǔn', 'yun3'],
    ['zǎ', 'za3'],
    ['zǎi', 'zai3'],
    ['zǎn', 'zan3'],
    ['zǎng', 'zang3'],
    ['zǎo', 'zao3'],
    ['zě', 'ze3'],
    ['zěi', 'zei3'],
    ['zěn', 'zen3'],
    ['zěng', 'zeng3'],
    ['zhǎ', 'zha3'],
    ['zhǎi', 'zhai3'],
    ['zhǎn', 'zhan3'],
    ['zhǎng', 'zhang3'],
    ['zhǎo', 'zhao3'],
    ['zhě', 'zhe3'],
    ['zhěi', 'zhei3'],
    ['zhěn', 'zhen3'],
    ['zhěng', 'zheng3'],
    ['zhǐ', 'zhi3'],
    ['zhǒng', 'zhong3'],
    ['zhǒu', 'zhou3'],
    ['zhǔ', 'zhu3'],
    ['zhuǎ', 'zhua3'],
    ['zhuǎi', 'zhuai3'],
    ['zhuǎn', 'zhuan3'],
    ['zhuǎng', 'zhuang3'],
    ['zhuǐ', 'zhui3'],
    ['zhǔn', 'zhun3'],
    ['zhuǒ', 'zhuo3'],
    ['zǐ', 'zi3'],
    ['zǒng', 'zong3'],
    ['zǒu', 'zou3'],
    ['zǔ', 'zu3'],
    ['zuǎn', 'zuan3'],
    ['zuǐ', 'zui3'],
    ['zǔn', 'zun3'],
    ['zuǒ', 'zuo3'],
    ['bǎngr', 'bang3r', 'bangr3'],
    ['bǎnr', 'ban3r', 'banr3'],
    ['bǎor', 'bao3r', 'baor3'],
    ['bǎr', 'ba3r', 'bar3'],
    ['běir', 'bei3r', 'beir3'],
    ['běnr', 'ben3r', 'benr3'],
    ['biǎnr', 'bian3r', 'bianr3'],
    ['cǎir', 'cai3r', 'cair3'],
    ['chǎnr', 'chan3r', 'chanr3'],
    ['chǎr', 'cha3r', 'char3'],
    ['chěngr', 'cheng3r', 'chengr3'],
    ['chuǎnr', 'chuan3r', 'chuanr3'],
    ['chǔnr', 'chun3r', 'chunr3'],
    ['cǐr', 'ci3r', 'cir3'],
    ['cǔnr', 'cun3r', 'cunr3'],
    ['cuǒr', 'cuo3r', 'cuor3'],
    ['dǎnr', 'dan3r', 'danr3'],
    ['dǎor', 'dao3r', 'daor3'],
    ['diǎnr', 'dian3r', 'dianr3'],
    ['diǎor', 'diao3r', 'diaor3'],
    ['dǐr', 'di3r', 'dir3'],
    ['dǒngr', 'dong3r', 'dongr3'],
    ['dǒur', 'dou3r', 'dour3'],
    ['duǐr', 'dui3r', 'duir3'],
    ['dǔnr', 'dun3r', 'dunr3'],
    ['fǎnr', 'fan3r', 'fanr3'],
    ['fěnr', 'fen3r', 'fenr3'],
    ['fǔr', 'fu3r', 'fur3'],
    ['gǎir', 'gai3r', 'gair3'],
    ['gǎnr', 'gan3r', 'ganr3'],
    ['gěnr', 'gen3r', 'genr3'],
    ['gěr', 'ge3r', 'ger3'],
    ['guǎnr', 'guan3r', 'guanr3'],
    ['guǎr', 'gua3r', 'guar3'],
    ['gǔnr', 'gun3r', 'gunr3'],
    ['gǔr', 'gu3r', 'gur3'],
    ['hǎir', 'hai3r', 'hair3'],
    ['hǎnr', 'han3r', 'hanr3'],
    ['hǎor', 'hao3r', 'haor3'],
    ['huǎr', 'hua3r', 'huar3'],
    ['huǐr', 'hui3r', 'huir3'],
    ['hǔnr', 'hun3r', 'hunr3'],
    ['huǒr', 'huo3r', 'huor3'],
    ['jiǎor', 'jiao3r', 'jiaor3'],
    ['jǐnr', 'jin3r', 'jinr3'],
    ['juǎnr', 'juan3r', 'juanr3'],
    ['juěr', 'jue3r', 'juer3'],
    ['kǎnr', 'kan3r', 'kanr3'],
    ['kěr', 'ke3r', 'ker3'],
    ['kǒngr', 'kong3r', 'kongr3'],
    ['kǒur', 'kou3r', 'kour3'],
    ['kuǎir', 'kuai3r', 'kuair3'],
    ['kuǎngr', 'kuang3r', 'kuangr3'],
    ['kuǎnr', 'kuan3r', 'kuanr3'],
    ['liǎnr', 'lian3r', 'lianr3'],
    ['lǐngr', 'ling3r', 'lingr3'],
    ['lǚr', 'lv3r', 'lvr3'],
    ['mǎnr', 'man3r', 'manr3'],
    ['mǎor', 'mao3r', 'maor3'],
    ['měir', 'mei3r', 'meir3'],
    ['měnr', 'men3r', 'menr3'],
    ['miǎnr', 'mian3r', 'mianr3'],
    ['mǐngr', 'ming3r', 'mingr3'],
    ['mǒr', 'mo3r', 'mor3'],
    ['nǎor', 'nao3r', 'naor3'],
    ['nǎr', 'na3r', 'nar3'],
    ['niǎor', 'niao3r', 'niaor3'],
    ['niǔr', 'niu3r', 'niur3'],
    ['pǎir', 'pai3r', 'pair3'],
    ['pǎnr', 'pan3r', 'panr3'],
    ['pěnr', 'pen3r', 'penr3'],
    ['piǎnr', 'pian3r', 'pianr3'],
    ['pǐngr', 'ping3r', 'pingr3'],
    ['pǐr', 'pi3r', 'pir3'],
    ['qiǎnr', 'qian3r', 'qianr3'],
    ['qǐr', 'qi3r', 'qir3'],
    ['quǎnr', 'quan3r', 'quanr3'],
    ['qǔnr', 'qun3r', 'qunr3'],
    ['qǔr', 'qu3r', 'qur3'],
    ['rěnr', 'ren3r', 'renr3'],
    ['shěngr', 'sheng3r', 'shengr3'],
    ['shěnr', 'shen3r', 'shenr3'],
    ['shǐr', 'shi3r', 'shir3'],
    ['shuǐr', 'shui3r', 'shuir3'],
    ['sǐr', 'si3r', 'sir3'],
    ['tǎir', 'tai3r', 'tair3'],
    ['tǎnr', 'tan3r', 'tanr3'],
    ['tǎor', 'tao3r', 'taor3'],
    ['těr', 'te3r', 'ter3'],
    ['tǒur', 'tou3r', 'tour3'],
    ['tuǐr', 'tui3r', 'tuir3'],
    ['tuǒr', 'tuo3r', 'tuor3'],
    ['wǎnr', 'wan3r', 'wanr3'],
    ['wěir', 'wei3r', 'weir3'],
    ['wǒr', 'wo3r', 'wor3'],
    ['xiǎnr', 'xian3r', 'xianr3'],
    ['xǐngr', 'xing3r', 'xingr3'],
    ['xǐnr', 'xin3r', 'xinr3'],
    ['xuěr', 'xue3r', 'xuer3'],
    ['yǎngr', 'yang3r', 'yangr3'],
    ['yǎnr', 'yan3r', 'yanr3'],
    ['yǐngr', 'ying3r', 'yingr3'],
    ['yǐnr', 'yin3r', 'yinr3'],
    ['yǐr', 'yi3r', 'yir3'],
    ['yuǎnr', 'yuan3r', 'yuanr3'],
    ['yǔnr', 'yun3r', 'yunr3'],
    ['zǎor', 'zao3r', 'zaor3'],
    ['zhǎor', 'zhao3r', 'zhaor3'],
    ['zhěr', 'zhe3r', 'zher3'],
    ['zhǐr', 'zhi3r', 'zhir3'],
    ['zhǒur', 'zhou3r', 'zhour3'],
    ['zhǔnr', 'zhun3r', 'zhunr3'],
    ['zhǔr', 'zhu3r', 'zhur3'],
    ['zǐr', 'zi3r', 'zir3'],
    ['zuǐr', 'zui3r', 'zuir3'],
    ['zuǒr', 'zuo3r', 'zuor3'],
    ['fur', 'fu5r', 'fur5'],
];

const PINYIN_BOUNDARIES = [
    ['lānǎo', 'la1nao3'],
    ['jiāo\'āo', 'jiao1ao1'],
];

describe('ConvertToPinyin1', function () {
    it('should convert to pinyin1 as expected', () => {
        for (const [pinyin, pinyin1] of SINGLE_PINYINS) {
            assert.equal(convertToPinyin1(pinyin), pinyin1);
        }
    });
    it('should handle number-form pinyin with r inside', () => {
        for (const [pinyin, pinyin1r, pinyinr1] of SINGLE_PINYINS) {
            if (!pinyinr1) {
                continue;
            }
            assert.equal(convertToPinyin1(pinyinr1), pinyin1r);
        }
    });
    it('should identify the word boundary', () => {
        for (const [pinyin, pinyin1] of PINYIN_BOUNDARIES) {
            assert.equal(convertToPinyin1(pinyin), pinyin1);
        }
    });
    it('should convert accents properly', () => {
        assert.equal(convertToPinyin1('bào'), 'bao4');
        assert.equal(convertToPinyin1('zhuàn'), 'zhuan4');
        assert.equal(convertToPinyin1('jiāng'), 'jiang1');
        assert.equal(convertToPinyin1('gōng'), 'gong1');
        assert.equal(convertToPinyin1('qīng'), 'qing1');
        assert.equal(convertToPinyin1('xué'), 'xue2');
    });
    it('should use 5 for neutral tone', () => {
        assert.equal(convertToPinyin1('le'), 'le5');
    })
    it('should move er out as a separate sound', () => {
        assert.equal(convertToPinyin1('háir\'ou'), 'hai2r ou5');
        assert.equal(convertToPinyin1('bārgǒu'), 'ba1rgou3');
        assert.equal(convertToPinyin1('lvr3'), 'lv3r');
    });
    it('should not mistake r as er sound', () => {
        assert.equal(convertToPinyin1('háirou'), 'hai2rou5');
        assert.equal(convertToPinyin1('réngǔ'), 'ren2gu3');
        assert.equal(convertToPinyin1('rènao'), 're4nao5');
        assert.equal(convertToPinyin1('āi ér bù shāng'), 'ai1 er2 bu4 shang1');
    });
    it('should convert Uppercase', () => {
        assert.equal(convertToPinyin1('Ào'), 'Ao4');
        assert.equal(convertToPinyin1('Wúxià\'āMéng'), 'Wu2xia4a1Meng2');
    });
    it('should remove apostrophe', () => {
        assert.equal(convertToPinyin1("jiāo'ǒu"), 'jiao1ou3');
    });
    it('should convert neutral tone 0 to 5', () => {
        assert.equal(convertToPinyin1('de0'), 'de5');
    });
    it('should change u: to v', () => {
        assert.equal(convertToPinyin1('nu:e4'), 'nve4')
    });
});
describe('ConvertToPinyin', function () {
    it('should convert to pinyin as expected', () => {
        for (const [pinyin, pinyin1] of SINGLE_PINYINS) {
            assert.equal(convertToPinyin(pinyin1), pinyin);
        }
    });
    it('should handle number-form pinyin with r inside', () => {
        assert.equal(convertToPinyin('lvr3'),'lǚr');
        for (const [pinyin, pinyin1r, pinyinr1] of SINGLE_PINYINS) {
            if (!pinyinr1) {
                continue;
            }
            assert.equal(convertToPinyin(pinyinr1), pinyin);
        }
    });
    it('should identify the word boundary', () => {
        for (const [pinyin, pinyin1] of PINYIN_BOUNDARIES) {
            assert.equal(convertToPinyin(pinyin1), pinyin);
        }
    });
    it('should handle 0 tone', () => {
        assert.equal(convertToPinyin('le0'), 'le');
    });
    it('should handle 5 tone', () => {
        assert.equal(convertToPinyin('de5'), 'de');
    });
    it('should put a space for r if next character is vowel', () => {
        assert.equal(convertToPinyin('lvr3ao0'), 'lǚr\'ao')
    });
    it('should put apostrophe to separate pinyins', () => {
        assert.equal(convertToPinyin('lan2ai4'), 'lán\'ài');
    });
});
describe('NormalizePinyin1', () => {
    it('should handle r', () => {
        assert.equal(normalizePinyin1('bārgǒu'), 'ba1 r gou3');
        assert.equal(normalizePinyin1('āi ér bù shāng'), 'ai1 er2 bu4 shang1');
        assert.equal(normalizePinyin1('lvr3'), 'lv3 r');
        assert.equal(normalizePinyin1('fur'), 'fu5 r');
    });
});
describe('NormalizePinyin', () => {
    it('should handle r', () => {
        assert.equal(normalizePinyin('fu5 r'), 'fu r');
    });
});
describe('CompactPinyin', () => {
    it('should handle r', () => {
        assert.equal(compactPinyin('fu r'), 'fur');
    });
});
describe('ConvertToPinyin1 then ConvertToPinyin', () => {
    it('should go back to original in most cases', () => {
        assert.equal(convertToPinyin1('āimén\'āihù'), 'ai1men2ai1hu4');
        assert.equal(convertToPinyin(convertToPinyin1('āimén\'āihù')), 'āimén\'āihù')
    });
});
describe('PinyinForPolly', () => {
    it('should not have dash at the end', () => {
        assert.equal(pinyinForPolly('zhǔnr'), 'zhunr3');
    });
});
