async function getQuestion(){
    let asks = [
        {
            en: "\"Creep\" is the first (not counting EP Drill) single by the English rock band Radiohead with the song of the same name, " +
                "released in 1992. The song was written in 1987, before Radiohead got together. " +
                "In September 1992, the song was taken to the radio station Radio 1, it seemed to the radio hosts too depressing, " +
                "it was played only twice and removed from rotation. However, after the release of the album, the single \"Creep\" rose to 71 lines " +
                "up in the UK charts, eventually taking seventh place. In 1998 it was performed by a Russian band and became a hit, " +
                "and the song, and a bright clip with an outrageous soloist, were played almost all over the irons of the country. It was stated that the lyrics of the song are " +
                "a humorous version of a children's poem by Agniya Barto. " +
                "The song spent 16 weeks on the charts of Moskovsky Komsomolets and took the first place four times. " +
                "\"\"Song of the Year\" according to Radio Max at the Maxidrom festival. What song are we talking about?",
            ru: "«Creep» — первый (не считая EP Drill) сингл английской рок-группы Radiohead с одноимённой песней, " +
                "выпущенный в 1992 году. Песня была написана в 1987 году, до того, как собралась группа  Radiohead. " +
                "В сентябре 1992 года песню взяли на радиостанцию Radio 1, она показалась радиоведущим слишком депрессивной, " +
                "её прокрутили всего дважды и сняли с ротации. Однако после выпуска альбома, сингл «Creep» поднялся на 71 строчку " +
                "вверх в британских чартах, заняв в итоге седьмое место. В 1998 году была исполнена российкой группой и стала хитом, " +
                "а песню, и яркий клип с эпатажной солисткой крутили практически по всем утюгам страны. Было заявлено, что слова песни -  " +
                "юмористического варианта детского стихотворения Агнии Барто. " +
                " Песня провела 16 недель в чартах \"Московского комсомольца\" и четыре раза занимала первое место. " +
                " \"Песня года\" по верии Радио Максимум на фестивале Maxidrom. О какой песне идёт речь?",
            ruAnswers: [
                 "Ляпис Трубецкой - \"Ты кинула\"",
                 "Агата Кристи - \"Ковёр-вертолёт\"",
                 "Океан Ельзи - \"Там, де нас нема\"",
                 "Сплин – \"Выхода нет\"",
                 "Маша и Медведи - \"Любочка\"",
                "Русский размер - \"Вот так\""
            ],
            enAnswers: [
                 "Lapis Trubetskoy - \"You threw\"",
                 "Agatha Christie - \"Helicopter Carpet\"",
                 "Okean Elzi - \"There, de us nema\"",
                 "Spleen – \"There is no way out\"",
                 "Masha and the Bears - \"Lyubochka\"",
                 "Russian size - \"That's it\""
            ],
            number: 1,
            fSong: "../../assets/mp3/1-1.mp3",
            sSong: "../../assets/mp3/1-2.mp3",
            fLogo: "../../assets/img/1-1.jpg",
            sLogo: "../../assets/img/1-2.jpg",
            ruDescription:"Группа «Маша и Медведи» была образована в 1997 году. " +
                "Отправной точкой истории группы можно считать 1996 год, " +
                "когда Мария Макарова передала демозапись своих песен гастролировавшему " +
                "в городе Краснодаре солисту группы «Мегаполис» Олегу Нестерову. " +
                "В 1997 году Маша Макарова подписывает контракт с Олегом Нестеровым, " +
                "который и становится её продюсером. В этом же году Маша собирает музыкантов.",
            enDescription:"The group \"Masha and the Bears\" was formed in 1997. " +
                "The starting point of the band's history can be considered 1996, " +
                "when Maria Makarova gave a demo recording of her songs " +
                "to Oleg Nesterov, the soloist of the Megapolis group, who was touring in Krasnodar. " +
                "In 1997 Masha Makarova signed a contract with Oleg Nesterov, " +
                "who became her producer. In the same year Masha gathers musicians."
        },
        {
            en: "The Cure, a British rock band formed in Crawley in 1978, " +
                "released the unremarkable Kyoto Song on the album The Head On The Door in 1985. " +
                "In 1989, against the background of stagnation and censorship, a rather old Russian rock band recorded the album \"St. 206 part 2\", " +
                "but the master disc of the album was lost and was found only in 1994. Against the background of such events " +
                ", the album \"The Sixth Forester\" was recorded in the same year, which includes a song very similar to the Kyoto Song from The Cure. But the frontman of this band does not hide, " +
                "that at that time he was fond of The Cure's work and borrowed part of the song from them. What song are we talking about?",
            ru: "The Cure, британская рок-группа, образованная в Кроули в 1978 году, " +
                "в 1985 году выпустила ничем не примечательную песню Kyoto Song в альбоме The Head On The Door.  " +
                "В 1989 году на фоне застоя и цензуры одна российская довольно старая рок-группа записала альбом «Ст. 206 ч. 2», " +
                " но мастер-диск альбома был утерян и был найден только в 1994 году. На фоне таких событий в этому же году записывается альбом  " +
                "альбом «Шестой лесничий», в который входит песня, весьма похожая на Kyoto Song от The Cure. Но фронтмэн этой группы и не скрывает, " +
                " что в то время улекался творчеством The Cure и часть песни позаимствовал у них. О какой песне идёт речь?",
            ruAnswers: [
                 "Ария - \"Торреро\"",
                 "Чёрный кофе - \"Леди осень\"",
                 "Мастер - \"Война\"",
                 "Алиса - \"Театр теней\"",
                 "Земляне - \"Трава у дома\"",
                 "Джокер - \"Дама пик\""
            ],
            enAnswers: [
                 "Aria - \"Torero\"",
                 "Black coffee - \"Lady Autumn\"",
                 "The Master - \"War\"",
                 "Alice - \"Shadow Theater\"",
                 "Earthlings - \"Grass at home\"",
                 "Joker - \"The Queen of Spades\""
            ],
            number: 2,
            fSong: "../../assets/mp3/2-1.mp3",
            sSong: "../../assets/mp3/2-2.mp3",
            fLogo: "../../assets/img/2-1.jpg",
            sLogo: "../../assets/img/2-2.jpg",
            ruDescription: "«Али́са» — советская и российская рок-группа, образованная в 1983 году в Ленинграде. " +
                " Одна из самых популярных групп русского рока. Лидер и автор большинства песен «Алисы» — Константин Кинчев. " +
                " Конкретный жанр музыки «Алисы» менялся с годами: от лёгкой «новой волны» в ранний период к более тяжёлому року, " +
                " а в XXI веке появилось влияние метала.",
            enDescription: "Alice is a Soviet and Russian rock band formed in 1983 in Leningrad."+
                "One of the most popular Russian rock bands. The leader and author of most of the songs of \"Alice\""+
                " is Konstantin Kinchev. The specific genre of Alice's music has changed over the years: from a light "+
                "\"new wave\" in the early period to heavier rock, and in the XXI century the influence of metal appeared."
        },
        {
            en: "Golden Earring is a rock band formed in 1961 in The Hague, South Holland, " +
                "released the unremarkable song Going to the Run in 1991, " +
                "which has not been widely recognized anywhere except the Netherlands. " +
                "The Dutch recorded this track in memory of their deceased biker friend from the Hell's Angels club. " +
                "In 1999, a Russian band riveted a Tribute album to Harley-Davidson, a glorious motorcycle, under a sensitive " +
                "the management of the \"sponsors\". The song Going to the Run was covered on this album. When it was discovered, " +
                "that the song is very similar to the song of the band Golden Earring, the rumblings about plagiarism began. " +
                "But the frontman of this band hastened to reassure everyone that it was just a cover, and in general - they have been practicing \"covers\" for a long time. " +
                "Well, there were plenty of \"covers\" for Iron Maden, Manowar and other Western bands, but " +
                "there were no mentions in the authorship of the songs on the albums of that time, except for the words of Pushkina M.A. or other band members. " +
                "Which group are we talking about?",
            ru: "Golden Earring — рок-группа, образованная в 1961 году в Гааге, Южная Голландия, " +
                "выпустила песню ничем не примечательную песню Going to the Run в 1991 году, " +
                "которая не получила широкого признания нигде, кроме Нидерландов.  " +
                "Нидерландцы записали этот трек в память о своём погибшем товарище – байкере из клуба Hell's Angels. " +
                "В 1999 году одна российкая группа клепала Tribute-альбом Харли-Дэвидсону, славному мотоциклу, под чутким  " +
                "руководством \"спонсоров\". Песня Going to the Run была переложена в этот альбом. Когда обнаружилось, " +
                "что песня очень уж похожа на песню группы Golden Earring, начались бурления о плагиате.\n" +
                "Но фронтмэн этой группы поспешил всех успокоить, что это просто кавер, и вообще - они давно практикуют \"каверы\". " +
                "Ну а \"каверов\" было предостаточно на Iron Maden, Manowar и другие западные группы, но на выпускавшихся альбомах " +
                "того времени упоминаний в авторстве песен никаких не было, кроме как на слова Пушкиной М.А. или прочих участников группы. " +
                "О какой группе идёт речь?",
            ruAnswers: [
                 "Чёрный обелиск - \"Здесь и сейчас\"",
                 "Коррозия металла - \"Russian Vodka\"",
                 "Чёрный кофе - \"Вольному — воля\"",
                 "Ария - \"Беспечный ангел\"",
                 "Алиса - \"Всё это рок-н-рол\"",
                 "Натиск - \"Одинокий герой\""
            ],
            enAnswers: [
                 "Black Obelisk - \"Here and Now\"",
                 "Metal corrosion - \"Russian Vodka\"",
                 "Black coffee - \"Free will\"",
                 "Aria - \"Careless Angel\"",
                 "Alice - \"It's All Rock and Roll\"",
                 "Onslaught - \"Lonely Hero\""
            ],
            number: 3,
            fSong: "../../assets/mp3/3-1.mp3",
            sSong: "../../assets/mp3/3-2.mp3",
            fLogo: "../../assets/img/3-1.jpg",
            sLogo: "../../assets/img/3-2.jpg",
            ruDescription: "«А́рия» — советская и российская хеви-метал-группа. " +
                " Одна из самых успешных российских рок-групп, " +
                " при этом — это одна из немногих российских метал-групп, " +
                " достигших серьёзного коммерческого и творческого успехов и " +
                " популярности за пределами поклонников хэви-метала. " +
                " Лауреат премии Fuzz 2007 года как лучшая live-группа. " +
                " Её бывшими участниками были образованы многие другие известные группы " +
                " («Мастер», «Кипелов», «Маврин», «Артерия», «Артур Беркут»), " +
                " которые вместе составляют плеяду, называемую «Семейкой Арии»",
            enDescription: "Aria is a Soviet and Russian heavy metal band. " +
                "One of the most successful Russian rock bands, " +
                "at the same time, it is one of the few Russian metal bands " +
                "that have achieved serious commercial and creative success and " +
                "popularity outside of heavy metal fans. " +
                "Winner of the 2007 Fuzz Award as the best live band. " +
                "Many other famous bands were formed by its former members " +
                "(\"Master\", \"Kipelov\", \"Mavrin\", \"Artery\", \"Artur Berkut\"), " +
                "which together make up a galaxy called the \"Aria Family\"."
        },
        {
            en: "Angel Dust is a German heavy metal band formed in 1984. " +
                "Their first album \"Into the Dark Past\" was released in 1986. The album turned out to be in the style of speed / thrash metal and was released in 30,000 copies. " +
                "In this album there was an unremarkable song I'll Come Back. " +
                "In 1988, a Russian band released the first version of their album on magnetic tape at the tone studio in Ostankino, " +
                "which included this Russified version of this song. The record company \"Melody\" did not give consent to the release of the record because of the challenging lyrics. " +
                "Subsequently, the original master tape was lost, and the remaining copies are considered rare. " +
                "Then this album along with this song was re-recorded in 1991, 1992, 1995 and in 2008. But already in 1991 " +
                ", the ear of the fatal music lover noticed some coincidences with Angel Dust. What song are we talking about?",
            ru: "Angel Dust — немецкая хеви-метал-группа, образованная в 1984 году. " +
                "Их первый альбом «Into the Dark Past» вышел в 1986 году. Альбом получился в стиле спид/трэш-метал и вышел тиражом в 30 000 копий. " +
                "В этом албоме и была ничем не примечательная песня I'll Come Back. " +
                "В 1988 году одна росйкая группа издала первый вариант своего альбома на магнитной ленте на тон-студии в Останкино,  " +
                "куда и вошла данная руссифицированная версия этой песни. Фирма грамзаписи «Мелодия» не давала согласие на выпуск пластинки из-за вызывающих текстов. " +
                "Впоследствии оригинальная мастер-лента была утеряна, а оставшиеся копии считаются редкостью. " +
                "Затем этот альбом вместе с этой песней перезаписывали в 1991, 1992, 1995 и в 2008 году. Но уже в 1991 году " +
                "ухо рокового меломана заметила некоторые свопадения с Angel Dust. О какой песне идёт речь?",
            ruAnswers: [
                 "Ария - \"Герой асфальта\"",
                 "Мастер - \"Семь кругов ада\"",
                 "Чёрный обелиск - \"Дорога в никуда\"",
                 "Эпидемия - \"Белый сокол\"",
                 "Корррозия Металла - \"Чёрный террор\"",
                 "Чёрный кофе - \"Я ищу...\""
            ],
            enAnswers: [
                 "Aria - \"Hero of asphalt\"",
                 "Master - \"Seven circles of hell\"",
                 "Black Obelisk - \"The Road to Nowhere\"",
                 "Epidemic - \"White Falcon\"",
                 "Metal Corrosion - \"Black Terror\"",
                 "Black coffee - \"I'm looking for...\""
            ],
            number: 4,
            fSong: "../../assets/mp3/4-1.mp3",
            sSong: "../../assets/mp3/4-2.mp3",
            fLogo: "../../assets/img/4-1.jpg",
            sLogo: "../../assets/img/4-2.jpg",
            ruDescription: "\"Коррозия металла\" — советская, затем российская трэш-метал группа " +
                "с примесью разнообразных метал-стилей. Скандально известна вызывающими " +
                "текстами и эпатажными сценическими выступлениями. На настоящий момент " +
                "лидером группы является сооснователь и бас-гитарист Сергей Троицкий, " +
                "известный под псевдонимом Паук, который изначально играл на ритм-гитаре. " +
                "Почти все участники группы традиционно выступают под псевдонимами. " +
                "За всю историю «Коррозии» через неё прошло более сорока музыкантов, " +
                "и лишь Троицкий остаётся её постоянным участником с момента основания.",
            enDescription: "\"Corrosion of Metal\" is a Soviet, then Russian thrash metal band " +
                "with an admixture of various metal styles. She is infamously known for provocative " +
                "texts and outrageous stage performances. At the moment " +
                ", the leader of the group is co-founder and bass guitarist Sergey Troitsky, " +
                "known under the pseudonym Spider, who originally played rhythm guitar. " +
                "Almost all the band members traditionally perform under pseudonyms. " +
                "Over the entire history of \"Corrosion\", more than forty musicians have passed through it, " +
                "and only Troitsky has remained a regular participant since its foundation."
        },
        {
            en: "In 1997, American guitarist Chester (Chet) Burton Atkins and Australian guitarist William Thomas Emmanuel " +
                "recorded the album The Day Finger Pickers Took Over the World. One of the songs (Smokey Mountain Lullaby) was even nominated " +
                "for a Grammy Award in 1997 for an instrumental performance in the country style, but the song of the same name with the album, The Day Finger Pickers Took Over the World " +
                ", never lit up anywhere. One of the performers of the Russian group visited his daughter in Philadelphia in the same year. " +
                "And suddenly, an epiphany fell on him right on the train between New York and Philadelphia and the talent gave rise to a new hit, " +
                "which eventually, organized among the listeners of the radio station \"Nashe Radio\", was ranked \"100 best songs of Russian rock in the XX century\". " +
                "Russian Russian Reporter and Expert magazines included the song in the list of \"One Hundred Main Songs in Russian (1917-2017)\". But this hit is really very similar " +
                "to the song The Day Finger Pickers Took Over the World from two \"zabugon\" guitarists. What song are we talking about?",
            ru: "В 1997 году американский гитарист Честер (Чет) Бертон Аткинс и автсралийский гитарист Уи́льям То́мас Эммануэ́ль " +
                "записали альбом The Day Finger Pickers Took Over the World. Одна из песен (Smokey Mountain Lullaby) даже была номинирована на номинирована " +
                "на премию \"Грэмми\" 1997 года за инструментальное исполнение в стиле кантри, но одноименная с альбомом песня The Day Finger Pickers Took Over the World " +
                "так нигде и не засветилась. Один из исполнителей российской группы в этом же году гостил у дочери в Филадельфии. " +
                "И вдруг на него прямо в поезде между Нью-Йорком и Филадельфией упало озарение и талан породил новый хит, " +
                "который в итоге, организованного среди слушателей радиостанции «Наше радио», попал в рейтинг «100 лучших песен русского рока в XX веке». " +
                " Журналами «Эксперт» и «Русский репортёр» песня была включена в перечень «Сто главных песен на русском языке (1917—2017)». Но данный хит уж очень похож " +
                "на песню The Day Finger Pickers Took Over the World от двух \"забугоных\" гитаристов. О какой песне идёт речь?",
            ruAnswers: [
                 "Машина времени - \"Однажды мир прогнётся под нас\"",
                 "Аквариум - \"Город золотой\"",
                 "Крематорий - \"Лепрозорий\"",
                 "Nautilus Pompilius - \"Скованные одной цепью\"",
                 "Кино - \"Хочу перемен\"",
                 "ДДТ - \"Рождённый в СССР\""
            ],
            enAnswers: [
                 "The Time Machine - \"One day the world will bend under us\"",
                 "Aquarium - \"Golden City\"",
                 "Crematorium - \"Leprosarium\"",
                 "Nautilus Pompilius - \"Chained together\"",
                 "Cinema - \"I want a change\"",
                 "DDT - \"Born in the USSR\""
            ],
            number: 5,
            fSong: "../../assets/mp3/5-1.mp3",
            sSong: "../../assets/mp3/5-2.mp3",
            fLogo: "../../assets/img/5-1.jpg",
            sLogo: "../../assets/img/5-2.jpg",
            ruDescription: "«Машина времени» — советская и российская рок-группа, " +
                "одна из старейших существующих групп русского рока.\n" +
                "Основана Андреем Макаревичем и Сергеем Кавагоэ 27 мая 1969 года, " +
                "их познакомил Юрий Борзов, который придумал название группы «Time Machines». " +
                "Жанр творчества группы включает элементы классического рока, рок-н-ролла, " +
                "блюза и бардовской песни.",
            enDescription: "\"Time Machine\" is a Soviet and Russian rock band, " +
                "one of the oldest existing Russian rock bands.\n" +
                "Founded by Andrey Makarevich and Sergey Kavagoe on May 27, 1969, " +
                "they were introduced by Yuri Borzov, who came up with the name of the group \"Time Machines\". " +
                "The genre of the band's creativity includes elements of classic rock, rock and roll, " +
                "blues and bard songs."
        },
        {
            en: "Chris Rea, a British singer, released in 1989 released his " +
                "tenth album, which became immediately popular. In 1994, a Russian " +
                "singer from one unpopular group recorded the most hit song. According to him, he added " +
                "only a few verses to it, but the authorship of the song itself is unknown. And in general, this song was considered literally \"yard\", " +
                "because it was sung in courtyards, pioneer camps, at bard gatherings, house drinking and anywhere.\n" +
                "As a result, this song was on television in heavy rotation for almost 8 months. " +
                "And in 1996, at the presentation of the \"Star\" award, the song was nominated in the \"Best Song\" category. " +
                "But the ear of music lovers almost immediately identified a clear similarity with the song The Road to Hell from the album of the same name " +
                "Chris Rea. The Russian singer himself pretended to be completely innocent and told everyone \"you're all lying.\" But if the song has already been performed " +
                "before and had the status of a folk song, then there is no way to hide the musical accompaniment. What song are we talking about?",
            ru: "Крис Ри, британский певец, в выпущенный в 1989 году выпустил свой " +
                "десятый альбом, который стал сразуже популярным. В 1994 году один российский " +
                "певец с одной малопопулярной группы записал самую хитовую песню. С его слов он добавил " +
                "в неё всего лишь несколько куплетов, но авторство самой песни не известно. И вообще, эта песны считалась буквально \"дворовой\", " +
                "т.к. её пели во дворах, пионерлагерях, на бардовских сборах, домашних пьянках и где угодно. " +
                "Данная песня в результате находилась на телевидении в тяжелой ротации почти 8 месяцев. " +
                "А в В 1996 году при вручении премии «Звезда» песня была номинирована в категории «Лучшая песня». " +
                "Но ухо меломанов практически сразу же определило явное сходство с песней The Road to Hell из одноименного альбома " +
                "Криса Ри. Сам же русский певец сделал вид полной непричастности и всем говорил \" всё вы врёти\". Но если песня до этого уже исполнялась " +
                "и имела статус народной, то уж музыкальное сопровождение никак не скрыть. О какой песне идёт речь?",
            ruAnswers: [
                 "Браво - \"Дорога в облака\"",
                 "Nautilus Pompilius - \"Прогулки по воде\"",
                 "Божья коровка - \"Гранитный камушек\"\n",
                 "Крематорий - \"Маленькая девочка\"",
                 "Чайф - \"Оранжевое настроение\"",
                 "ДДТ - \"В последнюю осень\""
            ],
            enAnswers: [
                 "Ladybug - \"Granite Stone\"",
                 "Bravo - \"The Road to the Clouds\"",
                 "Nautilus Pompilius - \"Walking on water\"",
                 "Crematorium - \"Little Girl\"",
                 "DDT - \"In the last autumn\"",
                 "Chaif - \"Orange mood\""
            ],
            number: 6,
            fSong: "../../assets/mp3/6-1.mp3",
            sSong: "../../assets/mp3/6-2.mp3",
            fLogo: "../../assets/img/6-1.jpg",
            sLogo: "../../assets/img/6-2.jpg",
            ruDescription: "«Бо́жья коро́вка» — советская, а затем российская музыкальная поп-рок группа. " +
                "Группа была создана весной 1988 года композитором-аранжировщиком Владимиром Воленко. " +
                "В 1989 году на студии группы «Дюна» Воленко записал пробный альбом, стиль которого сам охарактеризовал как «художественный панк». " +
                "Однако на фоне растущей популярности танцевальной музыки второй половины 80-х альбом такого содержания оказался невостребованным. " +
                "Разочарованные участники проекта разошлись по разным коллективам, где продолжительное время работали в качестве аккомпанирующих музыкантов.",
            enDescription: "Ladybug is a Soviet and then Russian pop-rock music group. " +
                "The group was created in the spring of 1988 by composer-arranger Vladimir Volenko. " +
                "In 1989, at the studio of the Dune group, Volenko recorded a trial album, the style of which he described as \"artistic punk\". " +
                "However, against the background of the growing popularity of dance music in the second half of the 80s, an album of such content turned out to be unclaimed. " +
                "The disappointed participants of the project dispersed to different groups, where they worked for a long time as accompanying musicians."
        },
        {
            en: "Back in 1972, the song Living Next Door to Alice was recorded by one " +
                "little-known Australian pop group New World, reaching the 35th position in the Australian chart. " +
                "In 1976, this song was honestly spioned by Smokie and made a real hit out of \"this\". " +
                "The single reached the first position on the UK Singles Chart, and in March 1977 reached the 25th line in the US chart. " +
                "The song took the first position in the charts of Austria, Germany, Ireland, the Netherlands, Norway and Switzerland. " +
                "Then this song was plagiarized all over the world. And, of course, it did not bypass Russia either. " +
                "One enterprising singer (according to him) came up with this song after meeting musician Mikhail Bashakov at a rock festival. " +
                "And in 1999, this creation hit the airwaves of many radio stations (\"Our Radio\", \"Baltika\"), and " +
                "in early 2001 (played on February 23 on the \"Chart Dozen\") topped all sorts of ratings and charts. " +
                "Naturally, the resemblance was right on the face, but somehow the Russian performers were very indifferent to it. " +
                "What song are we talking about?",
            ru: "В далёком 1972 году была записана песня Living Next Door to Alice одной " +
                "малоизвестной австралийской поп-группой New World, достигнув 35-ой позиции в чарте Австралии. " +
                "В 1976 году данную песню честно спионерили Smokie и сделали из \"этого\" настоящий хит. " +
                "Сингл вышел на первую позицию а UK Singles Chart, а в марте 1977 добрался до 25-й строки в чарте США. " +
                "Первую позицию песня занимала в чартах Австрии, Германии, Ирландии, Нидерландов, Норвегии и Швейцарии. " +
                "Потом эту песню плагиатили по всему миру. Ну и естественно она не обошла стороной и Россию. " +
                "Один предпримчивый певец (с его слов) придумал эту песню после знакомства с музыкантом Михаилом Башаковым на рок-фестивале. " +
                "И в 1999 году данное творение попала в эфир многих радиостанций («Наше радио», «Балтика»), а " +
                "в начале 2001 года (играла 23 февраля на «Чартовой дюжине») возглавила всевозможные рейтинги и чарты. " +
                "Естественно, сходство было прямо на лицо, но российским исполнителям как-то на это было очень всёравно. " +
                "О какой песне идёт речь?",
            ruAnswers: [
                 "Аукцион - \"Дорога\"",
                 "Чиж и Ко - \"Есть!\"",
                 "Крематорий - \"Хабибулин\"",
                 "Конец фильма - \"Элис\"",
                 "Леприконсы - \"Хали-гали паратрупер\"",
                 "Жуки - \"Танкист\""
            ],
            enAnswers: [
                 "Auction - \"The Road\"",
                 "Chizh and Co - \"There is!\"",
                 "Crematorium - \"Khabibullin\"",
                 "The end of the movie - \"Alice\"",
                 "Leprechauns - \"Hali-gali paratruper\"",
                 "Beetles - \"Tankman\""
            ],
            number: 7,
            fSong: "../../assets/mp3/7-1.mp3",
            sSong: "../../assets/mp3/7-2.mp3",
            fLogo: "../../assets/img/7-1.jpg",
            sLogo: "../../assets/img/7-2.jpg",
            ruDescription: "«Конец фильма» — российская рок-группа, " +
                "заявившая о себе выходом в 2001 году дебютного альбома «До свидания, невинность!». " +
                "К тому времени две песни — «Жёлтые глаза» и «Элис» — уже вовсю транслировали по радио. " +
                "Вторая волна популярности пришла к группе вместе с саундтреком к сериалу «Солдаты».",
            enDescription: "\"The End of the Movie\" is a Russian rock band " +
                "that announced itself with the release of its debut album \"Goodbye, Innocence!\" in 2001. " +
                "By that time, two songs — \"Yellow Eyes\" and \"Alice\" — were already being broadcast on the radio. " +
                "The second wave of popularity came to the group along with the soundtrack to the TV series \"Soldiers\"."
        },
    ];

    let result = [];
    let ctrl = new Set([1, 2, 3, 4, 5, 6, 7]);
    while (ctrl.size){
        let index = Math.ceil(Math.random()*7);
        if(ctrl.has(index)){
            ctrl.delete(index);
            result.push(asks[index]);
        }
    }
    return result;
}

