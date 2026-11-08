export interface GoldenRuleItem {
  id: number;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image?: string;
  iconType: 'calm' | 'window' | 'desk' | 'stairs' | 'assembly';
}

export interface ScenarioCardData {
  id: 'internal' | 'external';
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  whenUsedEn: string;
  whenUsedAr: string;
  actionsEn: string[];
  actionsAr: string[];
  photos: {
    src: string;
    labelEn: string;
    labelAr: string;
  }[];
}

export interface AgeGroupGuide {
  id: 'kg' | 'elementary' | 'secondary';
  tabTitleEn: string;
  tabTitleAr: string;
  gradeRangeEn: string;
  gradeRangeAr: string;
  headlineEn: string;
  headlineAr: string;
  cuePhraseEn: string;
  cuePhraseAr: string;
  stepsEn: string[];
  stepsAr: string[];
  teacherNoteEn: string;
  teacherNoteAr: string;
  featuredImage: string;
}

export type CampusZoneCategory = 'all' | 'assembly' | 'shelter' | 'classroom' | 'building';

export interface CampusPhotoItem {
  id: string;
  src: string;
  category: Exclude<CampusZoneCategory, 'all'>;
  titleEn: string;
  titleAr: string;
  zoneLabelEn: string;
  zoneLabelAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export const GOLDEN_RULES: GoldenRuleItem[] = [
  {
    id: 1,
    titleEn: '01. Stay Calm',
    titleAr: '01. الهدوء التام',
    descEn: "Stop current classroom activity immediately and listen carefully to your teacher's instructions without panic.",
    descAr: 'توقف عن النشاط الحالي فوراً واستمع بتركيز وهدوء لتعليمات المعلم أو المعلمة دون خوف أو تدافع.',
    iconType: 'calm',
  },
  {
    id: 2,
    titleEn: '02. Move Away from Glass',
    titleAr: '02. الابتعاد عن النوافذ',
    descEn: 'Step completely clear of exterior windows, glass partitions, and hanging light fixtures.',
    descAr: 'ابتعد تماماً عن النوافذ الزجاجية والواجهات الخارجية والأسقف المستعارة.',
    iconType: 'window',
  },
  {
    id: 3,
    titleEn: '03. Drop, Cover & Hold',
    titleAr: '03. الاحتماء تحت الطاولة',
    descEn: 'If inside the classroom, get underneath your desk and protect your head and neck with interlocked hands.',
    descAr: 'عند التواجد داخل الفصل، انزل تحت الطاولة فوراً واحمِ الرأس والرقبة بتشبيك اليدين.',
    image: '/images/Classroom 1.jpg',
    iconType: 'desk',
  },
  {
    id: 4,
    titleEn: '04. Use Stairs Only',
    titleAr: '04. استخدام الدرج فقط',
    descEn: 'Walk in an orderly single file through safe interior corridors. Never use elevators during an emergency alert.',
    descAr: 'سر في صف منتظم عبر الممرات الداخلية الآمنة واستخدم الدرج فقط. يمنع استخدام المصاعد منعاً باتاً.',
    image: '/images/Corridor 1.jpg',
    iconType: 'stairs',
  },
  {
    id: 5,
    titleEn: '05. Reach Safe Assembly Point',
    titleAr: '05. نقطة التجمع الآمنة',
    descEn: 'Follow green emergency exit signs to your designated Boys or Girls Assembly Point and remain with your class for roll call.',
    descAr: 'اتبع لوحات مخارج الطوارئ الخضراء نحو نقطة التجمع المخصصة للبنين أو البنات وانتظر لإجراء حصر الطلاب.',
    image: '/images/Assembly Point Boys 1.jpg',
    iconType: 'assembly',
  },
];

export const EMERGENCY_SCENARIOS: ScenarioCardData[] = [
  {
    id: 'internal',
    badgeEn: 'Protocol A · Building Intact',
    badgeAr: 'البروتوكول أ · المبنى سليم',
    titleEn: 'Internal Shelter-in-Place',
    titleAr: 'الاحتماء الداخلي الآمن - المبنى سليم',
    whenUsedEn: 'Activated during an Early Warning Alert when the school building is structurally sound and remaining indoors is safer than going outside.',
    whenUsedAr: 'يُطبق عند صدور الإنذار المبكر عندما يكون المبنى المدرسي سليماً ويكون البقاء بالداخل أكثر أماناً من الخروج.',
    actionsEn: [
      'Move immediately away from all windows and exterior glass walls.',
      'Take shelter under sturdy desks in classrooms or move to windowless interior corridors and ground lobbies.',
      'Close curtains and classroom doors, and switch off AC units if instructed by staff.',
      'Assume the head-and-neck protection posture until the official clearance announcement.',
    ],
    actionsAr: [
      'الابتعاد الفوري عن جميع النوافذ والواجهات الزجاجية الخارجية.',
      'الاحتماء تحت الطاولات داخل الفصول أو الانتقال إلى الممرات الداخلية والأبهية الأرضية الخالية من النوافذ.',
      'إغلاق الستائر وأبواب الفصول وإيقاف التكييف عند التوجيه بذلك.',
      'اتخاذ وضعية حماية الرأس والرقبة باليدين حتى صدور الإعلان الرسمي بانتهاء الحالة.',
    ],
    photos: [
      { src: '/images/Classroom 2.jpg', labelEn: 'Classroom Desk Shelter', labelAr: 'الاحتماء داخل الفصل الدراسي' },
      { src: '/images/Classroom 3.jpg', labelEn: 'Interior Classroom Zone', labelAr: 'منطقة الفصل الآمنة بعيداً عن النوافذ' },
      { src: '/images/Corridor 1.jpg', labelEn: 'Windowless Safe Corridor', labelAr: 'الممر الداخلي الآمن الخالي من النوافذ' },
      { src: '/images/Lobby 1.jpg', labelEn: 'Ground Floor Internal Lobby 1', labelAr: 'البهو الداخلي الأرضي ١' },
      { src: '/images/Lobby 2.jpg', labelEn: 'Ground Floor Internal Lobby 2', labelAr: 'البهو الداخلي الأرضي ٢' },
    ],
  },
  {
    id: 'external',
    badgeEn: 'Protocol B · Campus Evacuation',
    badgeAr: 'البروتوكول ب · إخلاء المبنى',
    titleEn: 'External Evacuation to Assembly Points',
    titleAr: 'الإخلاء الخارجي الآمن إلى نقاط التجمع',
    whenUsedEn: 'Activated upon direct instruction from school leadership or when an internal building hazard requires immediate outdoor evacuation.',
    whenUsedAr: 'يُطبق بتوجيه مباشر من إدارة المدرسة أو عند وجود طارئ داخلي يستدعي إخلاء المباني نحو الساحات الخارجية.',
    actionsEn: [
      'Leave all backpacks, books, and personal belongings behind immediately.',
      'Walk briskly and calmly in a single-file line without running, pushing, or overtaking.',
      'Descend using designated staircases only — never use elevators.',
      'Exit Campus Buildings 1–4 and assemble in silent rows at the Boys or Girls Assembly Points for roll call.',
    ],
    actionsAr: [
      'ترك جميع الحقائب والكتب والمقتنيات الشخصية فوراً وعدم الانشغال بجمعها.',
      'المشي بهدوء وانتظام في صف واحد دون ركض أو تدافع أو تزاحم.',
      'النزول عبر مخارج الدرج المخصصة فقط وعدم استخدام المصاعد مطلقاً.',
      'الخروج من المباني المدرسية ١-٤ والتوجه مباشرة إلى نقاط التجمع للبنين والبنات لإجراء الحصر.',
    ],
    photos: [
      { src: '/images/Building 1.jpg', labelEn: 'Campus Building 1 Exit', labelAr: 'مخرج المبنى المدرسي ١' },
      { src: '/images/Building 2.jpg', labelEn: 'Campus Building 2 Exit', labelAr: 'مخرج المبنى المدرسي ٢' },
      { src: '/images/Building 3.jpg', labelEn: 'Campus Building 3 Exit', labelAr: 'مخرج المبنى المدرسي ٣' },
      { src: '/images/Building 4.jpg', labelEn: 'Campus Building 4 Exit', labelAr: 'مخرج المبنى المدرسي ٤' },
      { src: '/images/Assembly Point Boys 1.jpg', labelEn: 'Boys Assembly Point 1', labelAr: 'نقطة تجمع البنين ١' },
      { src: '/images/Assembly Point Boys 2.jpg', labelEn: 'Boys Assembly Point 2', labelAr: 'نقطة تجمع البنين ٢' },
      { src: '/images/Assembly Point Girls 2.jpg', labelEn: 'Girls Assembly Point', labelAr: 'نقطة تجمع البنات' },
    ],
  },
];

export const AGE_GROUP_GUIDES: AgeGroupGuide[] = [
  {
    id: 'kg',
    tabTitleEn: 'KG & Grades 1–3',
    tabTitleAr: 'رياض الأطفال والصفوف الأولية (١-٣)',
    gradeRangeEn: 'Early Childhood & Lower Primary',
    gradeRangeAr: 'مرحلة الطفولة المبكرة والصفوف الأولية',
    headlineEn: 'Heroes Hideout Time!',
    headlineAr: 'يا أبطال، وقت الاختباء الآمن!',
    cuePhraseEn: 'Teacher Cue: "Heroes, it is hideout time — join the safety train!"',
    cuePhraseAr: 'نداء المعلمة: "يا أبطال، حان وقت الاختباء الآمن — لنصطف في قطار السلامة!"',
    stepsEn: [
      'Leave toys, crayons, and pencils on the table right away.',
      'Hold hands or follow closely in a single "Safety Train" line behind the teacher.',
      'Sit on your knees under the table or in the safe corner, bending your head down and covering the back of your neck with both hands.',
      'Listen calmly to comforting stories or songs with your teacher and earn your Bravery Star sticker after the drill!',
    ],
    stepsAr: [
      'ترك الألعاب والأقلام على الطاولة فوراً عند سماع نداء المعلمة.',
      'الاصطفاف في "قطار السلامة" خلف المعلمة بهدوء ودون خوف.',
      'الجلوس على الركبتين مع خفض الرأس وتغطية الرقبة بكلتا اليدين تحت الطاولة أو في الركن الآمن.',
      'الاستماع للقصص والأناشيد المهدئة والحصول على ملصق "نجمة الشجاعة" بعد انتهاء التمرين!',
    ],
    teacherNoteEn: 'Use reassuring play-based framing, gentle voice tone, and positive reinforcement badges.',
    teacherNoteAr: 'يُقدم التوجيه بأسلوب قصصي مطمئن ونبرة صوت هادئة مع تحفيز الأطفال بملصقات الشجاعة.',
    featuredImage: '/images/Classroom 1.jpg',
  },
  {
    id: 'elementary',
    tabTitleEn: 'Elementary Grades 4–6',
    tabTitleAr: 'المرحلة الابتدائية (٤-٦)',
    gradeRangeEn: 'Upper Elementary Students',
    gradeRangeAr: 'طلاب وطالبات الصفوف العليا الابتدائية',
    headlineEn: 'Immediate Readiness & Silent Orderly Line',
    headlineAr: 'وضعية الاستعداد الفوري والصف المنتظم الصامت',
    cuePhraseEn: 'Teacher Cue: "Emergency Alert, everyone take readiness position!"',
    cuePhraseAr: 'نداء المعلم: "إنذار طوارئ، الجميع يتخذ وضعية الاستعداد!"',
    stepsEn: [
      'Stand or kneel immediately in readiness posture beside or under your desk upon hearing the alert.',
      'Stay clear of windows, glass partitions, and suspended ceiling panels.',
      'When evacuating, walk in a silent single-file line down the right side of the stairs without running.',
      'Strict ban on using mobile phones, smartwatches, or taking photos/videos during the drill.',
    ],
    stepsAr: [
      'اتخاذ وضعية الاستعداد الفوري بجانب الطاولة أو الاحتماء أسفلها فور سماع النداء.',
      'الابتعاد التام عن النوافذ والقواطع الزجاجية والأسقف المستعارة.',
      'السير في صف فردي صامت ومنتظم عند النزول عبر الدرج دون جري أو تدافع.',
      'يُمنع منعاً باتاً استخدام الهواتف الجوالة أو التصوير أثناء التمرين أو الحالة الطارئة.',
    ],
    teacherNoteEn: 'Assign a front line leader and a rear monitor to verify no student stays behind in washrooms.',
    teacherNoteAr: 'تعيين طالب في مقدمة الصف وآخر في نهايته للتأكد من عدم تخلف أي طالب في دورات المياه أو الممرات.',
    featuredImage: '/images/Corridor 1.jpg',
  },
  {
    id: 'secondary',
    tabTitleEn: 'Middle & High School',
    tabTitleAr: 'المرحلتين المتوسطة والثانوية',
    gradeRangeEn: 'Grades 7–12 Student Leaders',
    gradeRangeAr: 'طلاب وطالبات المرحلتين المتوسطة والثانوية',
    headlineEn: 'Self-Control, Peer Support & Student Leadership',
    headlineAr: 'ضبط النفس، مساندة الزملاء، والقيادة الطلابية',
    cuePhraseEn: 'Protocol: Full composure, zero joking or panic, active assistance.',
    cuePhraseAr: 'البروتوكول: انضباط كامل، منع المزاح أو الهلع، ومشاركة قيادية فاعلة.',
    stepsEn: [
      'Maintain complete composure—zero joking, crowding, or spreading unverified rumors.',
      'Two designated Student Safety Leaders per class assist the teacher in organizing the evacuation line.',
      'Ensure classroom doors and curtains are closed and help guide younger students if crossing shared corridors.',
      'Maintain total silence along staircases and at the Assembly Point so PA announcements and roll call are clearly heard.',
    ],
    stepsAr: [
      'التحلي بأعلى درجات ضبط النفس والجدية التامة ومنع المزاح أو إثارة الهلع.',
      'يقوم قائدان طلابيان في كل فصل بمساندة المعلم في تنظيم الصف وتوجيه الزملاء.',
      'التأكد من إغلاق النوافذ والستائر والأبواب ومساعدة الطلاب الأصغر سناً في الممرات المشتركة.',
      'الالتزام بالصمت التام أثناء النزول وفي نقطة التجمع لسماع النداءات الصوتية وإتمام الحصر بدقة.',
    ],
    teacherNoteEn: 'Empower the two appointed class leaders to hold the class sign at the Assembly Point.',
    teacherNoteAr: 'تمكين قائدي الفصل من حمل لوحة الفصل في نقطة التجمع ومساعدة المعلم في مطابقة كشف الحضور.',
    featuredImage: '/images/Lobby 3.jpg',
  },
];

export const CAMPUS_GALLERY_ITEMS: CampusPhotoItem[] = [
  {
    id: 'assembly-boys-1',
    src: '/images/Assembly Point Boys 1.jpg',
    category: 'assembly',
    titleEn: 'Boys Assembly Point 1',
    titleAr: 'نقطة تجمع البنين ١',
    zoneLabelEn: 'Safe Assembly Zone · Boys',
    zoneLabelAr: 'منطقة تجمع آمنة · القسمين الابتدائي والمتوسط للبنين',
    descriptionEn: 'Primary outdoor safe gathering court for boys with clear green Assembly Point signage and shaded canopy.',
    descriptionAr: 'الساحة الخارجية الآمنة الأولى لتجمع الطلاب البنين والمميزة بلوحة نقطة التجمع الخضراء والمظلات الواقية.',
  },
  {
    id: 'assembly-boys-2',
    src: '/images/Assembly Point Boys 2.jpg',
    category: 'assembly',
    titleEn: 'Boys Assembly Point 2',
    titleAr: 'نقطة تجمع البنين ٢',
    zoneLabelEn: 'Safe Assembly Zone · Boys',
    zoneLabelAr: 'منطقة تجمع آمنة · طلاب القسم الثانوي للبنين',
    descriptionEn: 'Secondary outdoor evacuation court for boys ensuring rapid roll call away from building facades.',
    descriptionAr: 'نقطة التجمع الثانية المخصصة للطلاب البنين لضمان سرعة الاصطفاف وإجراء الحصر بعيداً عن المباني.',
  },
  {
    id: 'assembly-girls-2',
    src: '/images/Assembly Point Girls 2.jpg',
    category: 'assembly',
    titleEn: 'Girls Assembly Point',
    titleAr: 'نقطة تجمع البنات',
    zoneLabelEn: 'Safe Assembly Zone · Girls',
    zoneLabelAr: 'منطقة تجمع آمنة · قسم البنات',
    descriptionEn: 'Designated safe outdoor assembly area for girls section with direct stair exit access and roll-call stations.',
    descriptionAr: 'منطقة التجمع الخارجية الآمنة المخصصة لطالبات قسم البنات والمتصلة مباشرة بمخارج الطوارئ.',
  },
  {
    id: 'lobby-1',
    src: '/images/Lobby 1.jpg',
    category: 'shelter',
    titleEn: 'Internal Ground Lobby 1',
    titleAr: 'البهو الداخلي الأرضي ١',
    zoneLabelEn: 'Internal Shelter · Ground Floor',
    zoneLabelAr: 'منطقة احتماء داخلي · الدور الأرضي',
    descriptionEn: 'Protected interior ground floor lobby used for Internal Shelter-in-Place away from exterior glass.',
    descriptionAr: 'بهو داخلي محمي في الدور الأرضي يُستخدم للاحتماء الداخلي الآمن بعيداً عن النوافذ الخارجية.',
  },
  {
    id: 'lobby-2',
    src: '/images/Lobby 2.jpg',
    category: 'shelter',
    titleEn: 'Internal Ground Lobby 2',
    titleAr: 'البهو الداخلي الأرضي ٢',
    zoneLabelEn: 'Internal Shelter · Ground Floor',
    zoneLabelAr: 'منطقة احتماء داخلي · الدور الأرضي',
    descriptionEn: 'Central interior circulation hub serving both shelter-in-place and orderly evacuation routing.',
    descriptionAr: 'بهو داخلي مركزي مهيأ للاحتماء الآمن وتنظيم مسارات الإخلاء نحو المخارج.',
  },
  {
    id: 'lobby-3',
    src: '/images/Lobby 3.jpg',
    category: 'shelter',
    titleEn: 'Internal Ground Lobby 3',
    titleAr: 'البهو الداخلي الأرضي ٣',
    zoneLabelEn: 'Internal Shelter · Ground Floor',
    zoneLabelAr: 'منطقة احتماء داخلي · الدور الأرضي',
    descriptionEn: 'Spacious interior hall cleared of obstacles for rapid student movement and protected staging.',
    descriptionAr: 'صالة داخلية فسيحة خالية من العوائق لضمان سلامة حركة الطلاب والاحتماء الداخلي.',
  },
  {
    id: 'corridor-1',
    src: '/images/Corridor 1.jpg',
    category: 'shelter',
    titleEn: 'Safe Interior Corridor',
    titleAr: 'الممر الداخلي الآمن',
    zoneLabelEn: 'Internal Shelter & Single-File Route',
    zoneLabelAr: 'ممر احتماء داخلي ومسار الصف الفردي',
    descriptionEn: 'Windowless interior hallway ideal for single-file movement to stairs or protected corridor shelter.',
    descriptionAr: 'ممر داخلي خالٍ من النوافذ مخصص للسير في صف منتظم نحو الدرج أو الاحتماء الداخلي الآمن.',
  },
  {
    id: 'classroom-1',
    src: '/images/Classroom 1.jpg',
    category: 'classroom',
    titleEn: 'Model Classroom 1 (Desk Cover Zone)',
    titleAr: 'الفصل الدراسي ١ (منطقة الاحتماء تحت الطاولات)',
    zoneLabelEn: 'Drop, Cover & Hold Zone',
    zoneLabelAr: 'تطبيق وضعية انزل، احتمِ، تمسك',
    descriptionEn: 'Standard classroom layout where students practice immediate Drop, Cover & Hold beneath sturdy desks.',
    descriptionAr: 'بيئة الفصل الدراسي حيث يطبق الطلاب وضعية الاحتماء الفوري تحت الطاولات بعيداً عن النوافذ.',
  },
  {
    id: 'classroom-2',
    src: '/images/Classroom 2.jpg',
    category: 'classroom',
    titleEn: 'Model Classroom 2',
    titleAr: 'الفصل الدراسي ٢',
    zoneLabelEn: 'Classroom Readiness Zone',
    zoneLabelAr: 'منطقة الاستعداد والاصطفاف الصفي',
    descriptionEn: 'Classroom with clear aisles allowing students to form an orderly line at the door within seconds.',
    descriptionAr: 'فصل دراسي بممرات واضحة تتيح للطلاب الاصطفاف السريع والمنظم عند الباب خلال ثوانٍ.',
  },
  {
    id: 'classroom-3',
    src: '/images/Classroom 3.jpg',
    category: 'classroom',
    titleEn: 'Model Classroom 3',
    titleAr: 'الفصل الدراسي ٣',
    zoneLabelEn: 'Interior Wall Protection Zone',
    zoneLabelAr: 'منطقة الحماية بجوار الجدار الداخلي',
    descriptionEn: 'Equipped classroom environment where curtains are drawn and students shelter away from exterior windows.',
    descriptionAr: 'فصل دراسي مجهز يتم فيه إغلاق الستائر والاحتماء باتجاه الجدار الداخلي بعيداً عن الزجاج.',
  },
  {
    id: 'building-1',
    src: '/images/Building 1.jpg',
    category: 'building',
    titleEn: 'Campus Building 1',
    titleAr: 'المبنى المدرسي ١',
    zoneLabelEn: 'Main Academic Building 1',
    zoneLabelAr: 'المبنى الأكاديمي ١ ومخارج الطوارئ',
    descriptionEn: 'MEIS AlMuruj Building 1 exterior connected directly to the main outdoor assembly courts.',
    descriptionAr: 'المبنى المدرسي ١ في مدرسة الشرق الأوسط العالمية بالمروج والمتصل مباشرة بساحات التجمع.',
  },
  {
    id: 'building-2',
    src: '/images/Building 2.jpg',
    category: 'building',
    titleEn: 'Campus Building 2',
    titleAr: 'المبنى المدرسي ٢',
    zoneLabelEn: 'Main Academic Building 2',
    zoneLabelAr: 'المبنى الأكاديمي ٢ ومسارات الإخلاء',
    descriptionEn: 'MEIS AlMuruj Building 2 with dedicated ground-level emergency exits leading to safe assembly zones.',
    descriptionAr: 'المبنى المدرسي ٢ المزود بمخارج طوارئ أرضية تقود مباشرة إلى مناطق التجمع الآمنة.',
  },
  {
    id: 'building-3',
    src: '/images/Building 3.jpg',
    category: 'building',
    titleEn: 'Campus Building 3',
    titleAr: 'المبنى المدرسي ٣',
    zoneLabelEn: 'Main Academic Building 3',
    zoneLabelAr: 'المبنى الأكاديمي ٣',
    descriptionEn: 'MEIS AlMuruj Building 3 featuring wide perimeter walkways for unobstructed student evacuation.',
    descriptionAr: 'المبنى المدرسي ٣ المحاط بممرات خارجية واسعة تضمن انسيابية حركة الإخلاء.',
  },
  {
    id: 'building-4',
    src: '/images/Building 4.jpg',
    category: 'building',
    titleEn: 'Campus Building 4',
    titleAr: 'المبنى المدرسي ٤',
    zoneLabelEn: 'Main Academic Building 4',
    zoneLabelAr: 'المبنى الأكاديمي ٤',
    descriptionEn: 'MEIS AlMuruj Building 4 opening directly onto the shaded campus assembly courtyard.',
    descriptionAr: 'المبنى المدرسي ٤ المطل مباشرة على ساحة التجمع المظللة والآمنة.',
  },
];

export const EMERGENCY_CONTACTS = [
  {
    code: '911',
    nameEn: 'Unified Emergency (Riyadh)',
    nameAr: 'رقم الطوارئ الموحد (الرياض)',
  },
  {
    code: '998',
    nameEn: 'Civil Defense',
    nameAr: 'الدفاع المدني',
  },
  {
    code: '997',
    nameEn: 'Red Crescent Ambulance',
    nameAr: 'هيئة الهلال الأحمر السعودي',
  },
  {
    code: '999',
    nameEn: 'Police Emergency',
    nameAr: 'الشرطة (الأمن العام)',
  },
  {
    code: '937',
    nameEn: 'Ministry of Health Hotline',
    nameAr: 'مركز صحة ٩٣٧ (وزارة الصحة)',
  },
];

export interface GradeEvacuationPlanItem {
  id: string;
  departmentEn: string;
  departmentAr: string;
  subLocationEn?: string;
  subLocationAr?: string;
  gradeGroupEn: string;
  gradeGroupAr: string;
  evacuationRouteEn?: string;
  evacuationRouteAr?: string;
  evacuationLocationEn: string;
  evacuationLocationAr: string;
}

export const GRADE_EVACUATION_PLAN: GradeEvacuationPlanItem[] = [
  {
    id: 'kg-1',
    departmentEn: 'Kindergarten Department (KG)',
    departmentAr: 'قسم رياض الأطفال',
    gradeGroupEn: 'KG1, KG2, and Nursery',
    gradeGroupAr: 'الروضة ١، الروضة ٢، والحضانة',
    evacuationLocationEn: 'Breakfast Room – KG Department',
    evacuationLocationAr: 'غرفة الإفطار – قسم رياض الأطفال',
  },
  {
    id: 'kg-2',
    departmentEn: 'Kindergarten Department (KG)',
    departmentAr: 'قسم رياض الأطفال',
    gradeGroupEn: 'KG3',
    gradeGroupAr: 'الروضة ٣',
    evacuationLocationEn: 'Physical Education Room (PE Room)',
    evacuationLocationAr: 'صالة التربية البدنية (غرفة الرياضة)',
  },
  {
    id: 'primary-1',
    departmentEn: 'Primary Grades',
    departmentAr: 'الصفوف الأولية',
    gradeGroupEn: 'Grades 1, 2, and 3',
    gradeGroupAr: 'الصفوف ١ و ٢ و ٣',
    evacuationLocationEn: 'School Auditorium (Exit No. 7)',
    evacuationLocationAr: 'مسرح المدرسة (مخرج رقم ٧)',
  },
  {
    id: 'girls-g8',
    departmentEn: "Girls' Section",
    departmentAr: 'قسم البنات',
    subLocationEn: 'Designated Building – Lobby 2',
    subLocationAr: 'المبنى المخصص – البهو ٢',
    gradeGroupEn: 'Grade 8',
    gradeGroupAr: 'الصف الثامن',
    evacuationLocationEn: 'Rooms 26, 27, and 33',
    evacuationLocationAr: 'الغرف ٢٦، ٢٧، و ٣٣',
  },
  {
    id: 'girls-g9',
    departmentEn: "Girls' Section",
    departmentAr: 'قسم البنات',
    subLocationEn: 'Designated Building – Lobby 2',
    subLocationAr: 'المبنى المخصص – البهو ٢',
    gradeGroupEn: 'Grade 9',
    gradeGroupAr: 'الصف التاسع',
    evacuationLocationEn: 'Rooms 21 and 23',
    evacuationLocationAr: 'الغرفتان ٢١ و ٢٣',
  },
  {
    id: 'girls-g11',
    departmentEn: "Girls' Section",
    departmentAr: 'قسم البنات',
    subLocationEn: 'Designated Building – Lobby 1',
    subLocationAr: 'المبنى المخصص – البهو ١',
    gradeGroupEn: 'Grade 11',
    gradeGroupAr: 'الصف الحادي عشر',
    evacuationLocationEn: 'Library',
    evacuationLocationAr: 'المكتبة المدرسية',
  },
  {
    id: 'girls-g12',
    departmentEn: "Girls' Section",
    departmentAr: 'قسم البنات',
    subLocationEn: 'Designated Building – Lobby 1',
    subLocationAr: 'المبنى المخصص – البهو ١',
    gradeGroupEn: 'Grade 12',
    gradeGroupAr: 'الصف الثاني عشر',
    evacuationLocationEn: 'Room 15',
    evacuationLocationAr: 'الغرفة ١٥',
  },
  {
    id: 'boys-g5',
    departmentEn: "Boys' Section",
    departmentAr: 'قسم البنين',
    subLocationEn: 'Building 3 (Third floor to Ground floor)',
    subLocationAr: 'المبنى ٣ (من الدور الثالث إلى الدور الأرضي)',
    gradeGroupEn: 'Grade 5',
    gradeGroupAr: 'الصف الخامس',
    evacuationLocationEn: 'Computer Lab and Rooms 17 and 18',
    evacuationLocationAr: 'معمل الحاسب الآلي والغرفتان ١٧ و ١٨',
  },
  {
    id: 'boys-g6',
    departmentEn: "Boys' Section",
    departmentAr: 'قسم البنين',
    subLocationEn: 'Building 3 (Third floor to Ground floor)',
    subLocationAr: 'المبنى ٣ (من الدور الثالث إلى الدور الأرضي)',
    gradeGroupEn: 'Grade 6',
    gradeGroupAr: 'الصف السادس',
    evacuationLocationEn: 'Rooms 8, 10, and 13',
    evacuationLocationAr: 'الغرف ٨، ١٠، و ١٣',
  },
  {
    id: 'boys-g10',
    departmentEn: "Boys' Section",
    departmentAr: 'قسم البنين',
    subLocationEn: 'Building 4',
    subLocationAr: 'المبنى ٤',
    gradeGroupEn: 'Grade 10',
    gradeGroupAr: 'الصف العاشر',
    evacuationLocationEn: 'Lab 13',
    evacuationLocationAr: 'المختبر ١٣',
  },
  {
    id: 'boys-g11',
    departmentEn: "Boys' Section",
    departmentAr: 'قسم البنين',
    subLocationEn: 'Building 4',
    subLocationAr: 'المبنى ٤',
    gradeGroupEn: 'Grade 11',
    gradeGroupAr: 'الصف الحادي عشر',
    evacuationLocationEn: 'Coordinator Room',
    evacuationLocationAr: 'غرفة المنسق (Coordinator Room)',
  },
  {
    id: 'boys-g12',
    departmentEn: "Boys' Section",
    departmentAr: 'قسم البنين',
    subLocationEn: 'Building 4',
    subLocationAr: 'المبنى ٤',
    gradeGroupEn: 'Grade 12',
    gradeGroupAr: 'الصف الثاني عشر',
    evacuationLocationEn: 'Computer Lab',
    evacuationLocationAr: 'معمل الحاسب الآلي',
  },
];
