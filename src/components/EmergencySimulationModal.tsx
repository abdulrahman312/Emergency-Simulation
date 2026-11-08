import React, { useEffect, useRef, useState } from 'react';
import {
  Siren,
  Volume2,
  VolumeX,
  CheckCircle2,
  Footprints,
  MapPin,
  RotateCcw,
  Home,
  Users,
  Plus,
  Minus,
  Globe,
  Clock,
  ShieldCheck,
  HeartPulse,
  AlertTriangle,
  Shield,
  Wind,
  UserCheck,
  DoorClosed,
  ArrowDownRight,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Lock,
} from 'lucide-react';
import {
  Language,
  TARGET_DRILL_SECONDS,
  formatTimeMMSS,
  calculateFiveStageDrillPerformance,
  getBreathingState,
} from '../utils/simulationLogic';
import {
  HeadNeckPostureIcon,
  WindowClearanceIcon,
  DeskShelterIcon,
  StairsOnlyIcon,
} from './SafetyInstructionIcons';
import { GRADE_EVACUATION_PLAN } from '../data/portalContent';
import { Building2, DoorOpen, GraduationCap } from 'lucide-react';

interface EmergencySimulationModalProps {
  lang: Language;
  onToggleLanguage: () => void;
  onCloseSimulation: () => void;
}

interface StageInstructionPoint {
  icon: React.ReactNode;
  iconBgClass: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

interface StageConfig {
  stageNumber: 1 | 2 | 3 | 4 | 5;
  codeLabel: string;
  titleEn: string;
  titleAr: string;
  shortTabEn: string;
  shortTabAr: string;
  summaryEn: string;
  summaryAr: string;
  accentBorderClass: string;
  accentBadgeClass: string;
  buttonGradient: string;
  completeBtnEn: string;
  completeBtnAr: string;
  headerIcon: React.ReactNode;
  headerIconBoxClass: string;
  points: StageInstructionPoint[];
}

export const EmergencySimulationModal: React.FC<EmergencySimulationModalProps> = ({
  lang,
  onToggleLanguage,
  onCloseSimulation,
}) => {
  const isAr = lang === 'ar';
  const sirenVideoRef = useRef<HTMLVideoElement | null>(null);
  const stageMutedVideoRef = useRef<HTMLVideoElement | null>(null);

  // Current active stage (0 = Stage 1, 1 = Stage 2, 2 = Stage 3, 3 = Stage 4, 4 = Stage 5)
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  // Audio volume state for Siren Video (0 to 100)
  const [volumePercent, setVolumePercent] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Timers & 5-Stage completion timestamps (in elapsed seconds)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [stageTimes, setStageTimes] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Stage 4 live 4-4-8 breathing helper state
  const [breathingCycleSeconds, setBreathingCycleSeconds] = useState<number>(0);
  const [isBreathingPaused, setIsBreathingPaused] = useState<boolean>(false);

  // Stage 5 Evacuation Plan Department Filter & Class Roll-Call Counter
  const [evacFilter, setEvacFilter] = useState<'all' | 'kg' | 'primary' | 'girls' | 'boys'>('all');
  const [totalStudents, setTotalStudents] = useState<number>(28);
  const [accountedStudents, setAccountedStudents] = useState<number>(28);

  // Sync volume & mute state with right-bottom siren video
  useEffect(() => {
    const vid = sirenVideoRef.current;
    if (!vid) return;
    vid.volume = Math.max(0, Math.min(1, volumePercent / 100));
    vid.muted = isMuted || volumePercent === 0;
  }, [volumePercent, isMuted]);

  // Start siren video playback on mount
  useEffect(() => {
    const vid = sirenVideoRef.current;
    if (!vid) return;
    vid.volume = 0.5;
    vid.play().catch(() => {});
  }, []);

  // Enforce strict mute on left-side instructional videos (Stage 1 & Stage 3)
  useEffect(() => {
    const vid = stageMutedVideoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.volume = 0;
    vid.play().catch(() => {});
  }, [currentStageIndex]);

  // Pause siren video only when all 5 stages are completed
  useEffect(() => {
    const vid = sirenVideoRef.current;
    if (!vid) return;
    if (isCompleted) {
      vid.pause();
    } else {
      vid.play().catch(() => {});
    }
  }, [isCompleted]);

  // 1-second stopwatch & countdown interval while drill is active
  useEffect(() => {
    if (isCompleted) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isCompleted]);

  // 1-second breathing timer when on Stage 4
  useEffect(() => {
    if (currentStageIndex !== 3 || isBreathingPaused || isCompleted) return;
    const interval = window.setInterval(() => {
      setBreathingCycleSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [currentStageIndex, isBreathingPaused, isCompleted]);

  const countdownRemaining = Math.max(0, TARGET_DRILL_SECONDS - elapsedSeconds);
  const performance = calculateFiveStageDrillPerformance(stageTimes, elapsedSeconds);
  const breathingInfo = getBreathingState(breathingCycleSeconds);

  const STAGES: StageConfig[] = [
    {
      stageNumber: 1,
      codeLabel: '01',
      titleEn: '01. Stay Calm',
      titleAr: '٠١. الهدوء التام',
      shortTabEn: '01. Stay Calm',
      shortTabAr: '٠١. الهدوء التام',
      summaryEn:
        "Stop current classroom activity immediately and listen carefully to your teacher's instructions without panic.",
      summaryAr:
        'توقف عن النشاط الصفي فوراً واستمع بتركيز وهدوء لتعليمات المعلم أو المعلمة دون خوف أو تدافع.',
      accentBorderClass: 'border-[#0284C7]',
      accentBadgeClass: 'bg-sky-50 text-[#0284C7] border-sky-200',
      buttonGradient: 'linear-gradient(135deg, #0284C7 0%, #0D9488 100%)',
      completeBtnEn: 'Complete Stage 1 · Continue to Stage 2',
      completeBtnAr: 'إتمام المرحلة ١ · الانتقال إلى المرحلة ٢',
      headerIcon: <HeartPulse className="w-6 h-6 text-[#0284C7]" aria-hidden="true" />,
      headerIconBoxClass: 'bg-sky-50 border-sky-200',
      points: [
        {
          icon: <HeartPulse className="w-5 h-5 text-[#0284C7]" />,
          iconBgClass: 'bg-sky-50 border-sky-200',
          titleEn: 'Stop Classroom Activity Immediately',
          titleAr: 'إيقاف النشاط الدراسي فوراً',
          descEn: 'Put down pens, books, and devices right away and remain seated calmly.',
          descAr: 'اترك الأقلام والكتب والأجهزة فوراً وابقَ هادئاً في مكانك.',
        },
        {
          icon: <VolumeX className="w-5 h-5 text-[#0284C7]" />,
          iconBgClass: 'bg-sky-50 border-sky-200',
          titleEn: 'Maintain Complete Silence',
          titleAr: 'الالتزام بالصمت والهدوء التام',
          descEn: 'Stop talking immediately so everyone can clearly hear the alert and teacher.',
          descAr: 'توقف عن التحدث تماماً ليتمكن الجميع من سماع التنبيهات وتوجيهات المعلم.',
        },
        {
          icon: <UserCheck className="w-5 h-5 text-[#0D9488]" />,
          iconBgClass: 'bg-teal-50 border-teal-200',
          titleEn: "Follow Your Teacher's Instructions",
          titleAr: 'اتباع تعليمات المعلم بدقة',
          descEn: 'Keep your eyes on your teacher and follow their guidance step by step.',
          descAr: 'وجّه نظرك وانتباهك نحو المعلم واتبع إرشاداته خطوة بخطوة.',
        },
        {
          icon: <ShieldCheck className="w-5 h-5 text-[#059669]" />,
          iconBgClass: 'bg-emerald-50 border-emerald-200',
          titleEn: 'Zero Panic or Rushing',
          titleAr: 'منع الهلع أو الاندفاع',
          descEn: 'Do not run toward the door or push classmates; stay composed and ready.',
          descAr: 'لا تركض نحو الباب ولا تتدافع مع زملائك؛ تحلَّ بالطمأنينة والاستعداد.',
        },
      ],
    },
    {
      stageNumber: 2,
      codeLabel: '02',
      titleEn: '02. Move Away from Glass',
      titleAr: '٠٢. الابتعاد عن النوافذ والزجاج',
      shortTabEn: '02. Move Away from Glass',
      shortTabAr: '٠٢. الابتعاد عن الزجاج',
      summaryEn:
        'Step completely clear of exterior windows, glass partitions, and hanging light fixtures.',
      summaryAr:
        'ابتعد تماماً عن النوافذ الخارجية والقواطع الزجاجية ووحدات الإضاءة المعلقة.',
      accentBorderClass: 'border-[#EF4444]',
      accentBadgeClass: 'bg-red-50 text-[#EF4444] border-red-200',
      buttonGradient: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
      completeBtnEn: 'Complete Stage 2 · Continue to Stage 3',
      completeBtnAr: 'إتمام المرحلة ٢ · الانتقال إلى المرحلة ٣',
      headerIcon: <AlertTriangle className="w-6 h-6 text-[#EF4444]" aria-hidden="true" />,
      headerIconBoxClass: 'bg-red-50 border-red-200',
      points: [
        {
          icon: <WindowClearanceIcon className="w-5 h-5 text-[#EF4444]" />,
          iconBgClass: 'bg-red-50 border-red-200',
          titleEn: 'Keep Safe Distance (At Least 1m / 3ft Back)',
          titleAr: 'حافظ على مسافة آمنة (متر واحد على الأقل)',
          descEn: 'Step at least 1 meter (3 feet) back from all exterior windows and glass walls.',
          descAr: 'ابتعد مسافة متر واحد (٣ أقدام) على الأقل عن جميع النوافذ والواجهات الزجاجية.',
        },
        {
          icon: <AlertTriangle className="w-5 h-5 text-[#DC2626]" />,
          iconBgClass: 'bg-red-50 border-red-200',
          titleEn: 'Do Not Touch, Lean, or Play Near Glass',
          titleAr: 'لا تلمس الزجاج أو تستند عليه',
          descEn: 'Never lean against windows or glass partitions to prevent falls and breakage.',
          descAr: 'يُمنع الاستناد على النوافذ أو لمس القواطع الزجاجية لتجنب السقوط أو الانكسار.',
        },
        {
          icon: <DoorClosed className="w-5 h-5 text-[#D97706]" />,
          iconBgClass: 'bg-amber-50 border-amber-200',
          titleEn: 'Clear of Hanging Fixtures & Shelving',
          titleAr: 'الابتعاد عن الإضاءة المعلقة والخزائن',
          descEn: 'Move away from suspended ceiling lights, tall cabinets, and unsecured displays.',
          descAr: 'ابتعد عن وحدات الإضاءة المعلقة والخزائن المرتفعة داخل الفصل.',
        },
        {
          icon: <Shield className="w-5 h-5 text-[#059669]" />,
          iconBgClass: 'bg-emerald-50 border-emerald-200',
          titleEn: 'Move Toward Solid Interior Walls',
          titleAr: 'التوجه نحو الجدران الداخلية الآمنة',
          descEn: 'Position yourself toward the inner classroom zone or windowless interior corridor.',
          descAr: 'تمركز في الجزء الداخلي من الفصل أو بالقرب من الجدران الداخلية الصلبة.',
        },
      ],
    },
    {
      stageNumber: 3,
      codeLabel: '03',
      titleEn: '03. Drop, Cover & Hold',
      titleAr: '٠٣. انزل، احتمِ، وتمسك (الاحتماء تحت الطاولة)',
      shortTabEn: '03. Drop, Cover & Hold',
      shortTabAr: '٠٣. الاحتماء تحت الطاولة',
      summaryEn:
        'If inside the classroom, get underneath your desk and protect your head and neck with interlocked hands.',
      summaryAr:
        'عند التواجد داخل الفصل، انزل تحت الطاولة فوراً واحمِ الرأس والرقبة بتشبيك اليدين.',
      accentBorderClass: 'border-[#F59E0B]',
      accentBadgeClass: 'bg-amber-50 text-[#D97706] border-amber-200',
      buttonGradient: 'linear-gradient(135deg, #D97706 0%, #EA580C 100%)',
      completeBtnEn: 'Complete Stage 3 · Continue to Stage 4',
      completeBtnAr: 'إتمام المرحلة ٣ · الانتقال إلى المرحلة ٤',
      headerIcon: <Shield className="w-6 h-6 text-[#D97706]" aria-hidden="true" />,
      headerIconBoxClass: 'bg-amber-50 border-amber-200',
      points: [
        {
          icon: <ArrowDownRight className="w-5 h-5 text-[#D97706]" />,
          iconBgClass: 'bg-amber-50 border-amber-200',
          titleEn: 'DROP to Your Hands and Knees',
          titleAr: 'انزل (DROP) على ركبتيك فوراً',
          descEn: 'Drop down onto your knees immediately next to your desk to stay balanced.',
          descAr: 'انزل على ركبتيك بجانب مقعدك الدراسي فوراً للحفاظ على توازنك.',
        },
        {
          icon: <DeskShelterIcon className="w-5 h-5 text-[#EA580C]" />,
          iconBgClass: 'bg-orange-50 border-orange-200',
          titleEn: 'COVER Underneath Your Sturdy Desk',
          titleAr: 'احتمِ (COVER) بالكامل تحت الطاولة',
          descEn: 'Get completely underneath your classroom table so your body is shielded.',
          descAr: 'ادخل بالكامل تحت طاولة الفصل الدراسية لتوفير مظلة حماية لجسمك.',
        },
        {
          icon: <HeadNeckPostureIcon className="w-5 h-5 text-[#DC2626]" />,
          iconBgClass: 'bg-red-50 border-red-200',
          titleEn: 'Protect Head & Neck with Interlocked Hands',
          titleAr: 'احمِ الرأس والرقبة بتشبيك اليدين',
          descEn: 'Bend your head down toward your knees and lock your hands over your neck.',
          descAr: 'اخفض رأسك باتجاه الركبتين وشبّك كلتا يديك خلف الرقبة والرأس بإحكام.',
        },
        {
          icon: <ShieldCheck className="w-5 h-5 text-[#059669]" />,
          iconBgClass: 'bg-emerald-50 border-emerald-200',
          titleEn: 'HOLD ON Until Teacher Gives Clearance',
          titleAr: 'تمسّك (HOLD) حتى يصدر توجيه المعلم',
          descEn: 'Hold firmly onto the desk leg and remain underneath until instructed to rise.',
          descAr: 'أمسك بقائمة الطاولة بثبات وابقَ في مكانك حتى يطلب منك المعلم القيام.',
        },
      ],
    },
    {
      stageNumber: 4,
      codeLabel: '04',
      titleEn: '04. Calm Yourself (4-4-8 Breathing)',
      titleAr: '٠٤. هدّئ نفسك (تقنية التنفس ٤-٤-٨)',
      shortTabEn: '04. Calm Yourself',
      shortTabAr: '٠٤. هدّئ نفسك',
      summaryEn:
        'Practice the 4-4-8 calming breathing technique to steady your heart rate and keep your mind and body calm.',
      summaryAr:
        'طبّق تقنية التنفس التهدئي (٤-٤-٨) لتهدئة العقل والجسم وتنظيم ضربات القلب بطمأنينة.',
      accentBorderClass: 'border-[#0D9488]',
      accentBadgeClass: 'bg-teal-50 text-[#0D9488] border-teal-200',
      buttonGradient: 'linear-gradient(135deg, #0D9488 0%, #059669 100%)',
      completeBtnEn: 'Complete Stage 4 · Continue to Stage 5',
      completeBtnAr: 'إتمام المرحلة ٤ · الانتقال إلى المرحلة ٥',
      headerIcon: <Wind className="w-6 h-6 text-[#0D9488]" aria-hidden="true" />,
      headerIconBoxClass: 'bg-teal-50 border-teal-200',
      points: [
        {
          icon: <Wind className="w-5 h-5 text-[#0284C7]" />,
          iconBgClass: 'bg-sky-50 border-sky-200',
          titleEn: '1. INHALE Slowly for 4 Seconds',
          titleAr: '١. شهيق هادئ لمدة ٤ ثوانٍ (INHALE)',
          descEn: 'Place one hand on your chest and breathe in gently through your nose for 4 seconds.',
          descAr: 'ضع يدك على صدرك وخذ نفساً عميقاً وهادئاً من الأنف لمدة ٤ ثوانٍ.',
        },
        {
          icon: <Clock className="w-5 h-5 text-[#D97706]" />,
          iconBgClass: 'bg-amber-50 border-amber-200',
          titleEn: '2. HOLD Breath for 4 Seconds',
          titleAr: '٢. احتفظ بالنفس لمدة ٤ ثوانٍ (HOLD)',
          descEn: 'Keep your shoulders relaxed and hold the air calmly inside for 4 seconds.',
          descAr: 'أبقِ كتفيك مسترخيتين واحتفظ بالنفس بهدوء داخل صدرك لمدة ٤ ثوانٍ.',
        },
        {
          icon: <Sparkles className="w-5 h-5 text-[#0D9488]" />,
          iconBgClass: 'bg-teal-50 border-teal-200',
          titleEn: '3. EXHALE Gently for 8 Seconds',
          titleAr: '٣. زفير بطيء لمدة ٨ ثوانٍ (EXHALE)',
          descEn: 'Release your breath slowly through your mouth for 8 seconds until relaxed.',
          descAr: 'أخرج الهواء ببطء ولطف من الفم لمدة ٨ ثوانٍ كاملة حتى تشعر بالهدوء.',
        },
        {
          icon: <HeartHandshake className="w-5 h-5 text-[#059669]" />,
          iconBgClass: 'bg-emerald-50 border-emerald-200',
          titleEn: 'Calm Mind, Body & Reassure Classmates',
          titleAr: 'تهدئة النفس وطمأنة الزملاء',
          descEn: 'Repeat the 4-4-8 cycle with your class and support peers with calm words.',
          descAr: 'كرر دورة التنفس (٤-٤-٨) مع فصلك وساند زملاءك بكلمات مطمئنة وهادئة.',
        },
      ],
    },
    {
      stageNumber: 5,
      codeLabel: '05',
      titleEn: '05. Evacuation When Required',
      titleAr: '٠٥. الإخلاء عند الحاجة والتوجه لنقطة التجمع',
      shortTabEn: '05. Evacuation When Required',
      shortTabAr: '٠٥. الإخلاء ونقطة التجمع',
      summaryEn:
        'Evacuate only if instructed by your teacher. Walk in a proper single-file line using staircases only, and gather at the Boys or Girls Assembly Point.',
      summaryAr:
        'يتم الإخلاء فقط عند توجيه المعلم. سر في صف فردي منتظم عبر الدرج فقط، وتوجه إلى نقطة التجمع المخصصة للبنين أو البنات.',
      accentBorderClass: 'border-[#10B981]',
      accentBadgeClass: 'bg-emerald-50 text-[#059669] border-emerald-200',
      buttonGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      completeBtnEn: 'Complete Stage 5 · Finish Evacuation Drill',
      completeBtnAr: 'إتمام المرحلة ٥ · إنهاء تمرين الإخلاء',
      headerIcon: <MapPin className="w-6 h-6 text-[#059669]" aria-hidden="true" />,
      headerIconBoxClass: 'bg-emerald-50 border-emerald-200',
      points: [
        {
          icon: <UserCheck className="w-5 h-5 text-[#0284C7]" />,
          iconBgClass: 'bg-sky-50 border-sky-200',
          titleEn: 'Evacuate Only If Instructed by Teacher',
          titleAr: 'الإخلاء بتوجيه المعلم فقط',
          descEn: 'Wait for your teacher’s command before leaving the classroom; leave all bags behind.',
          descAr: 'لا تغادر الفصل إلا بعد صدور توجيه مباشر من المعلم، واترك جميع الحقائب خلفك.',
        },
        {
          icon: <Footprints className="w-5 h-5 text-[#EA580C]" />,
          iconBgClass: 'bg-orange-50 border-orange-200',
          titleEn: 'Move in a Proper Single-File Line',
          titleAr: 'السير في صف فردي منتظم',
          descEn: 'Follow your teacher calmly in an orderly single line through safe interior corridors.',
          descAr: 'سر خلف معلمك بهدوء وانتظام في صف واحد عبر الممرات الآمنة دون ركض أو تدافع.',
        },
        {
          icon: <StairsOnlyIcon className="w-5 h-5 text-[#DC2626]" />,
          iconBgClass: 'bg-red-50 border-red-200',
          titleEn: 'Use Staircases Only — NEVER Use Elevators',
          titleAr: 'استخدم الدرج فقط — يُمنع استخدام المصاعد',
          descEn: 'Descend carefully using designated staircases only. Elevators are strictly prohibited.',
          descAr: 'انزل بهدوء عبر مخارج الدرج المخصصة فقط، ويُمنع استخدام المصاعد منعاً باتاً.',
        },
        {
          icon: <MapPin className="w-5 h-5 text-[#059669]" />,
          iconBgClass: 'bg-emerald-50 border-emerald-200',
          titleEn: 'Reach Boys & Girls Safe Assembly Points',
          titleAr: 'الوصول لنقاط التجمع الآمنة للبنين والبنات',
          descEn: 'Follow green exit signs to your designated Boys or Girls Assembly Point for roll call.',
          descAr: 'اتبع لوحات الخروج الخضراء نحو نقطة تجمع البنين أو البنات وابقَ مع فصلك لإجراء الحصر.',
        },
      ],
    },
  ];

  const activeStage = STAGES[currentStageIndex];

  const handleCompleteCurrentStage = () => {
    const now = elapsedSeconds;
    setStageTimes((prev) => {
      const next = [...prev];
      if (next[currentStageIndex] === null) {
        next[currentStageIndex] = now;
      }
      // If completing final stage, ensure any unrecorded prior stages also get stamped
      if (currentStageIndex === 4) {
        for (let i = 0; i < 5; i++) {
          if (next[i] === null) next[i] = now;
        }
      }
      return next;
    });

    if (currentStageIndex < 4) {
      setCurrentStageIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleSelectStageTab = (index: number) => {
    if (isCompleted) {
      setIsCompleted(false);
    }
    setCurrentStageIndex(index);
  };

  const handleRestartSimulation = () => {
    setElapsedSeconds(0);
    setStageTimes([null, null, null, null, null]);
    setCurrentStageIndex(0);
    setEvacFilter('all');
    setBreathingCycleSeconds(0);
    setIsCompleted(false);
    if (sirenVideoRef.current) {
      sirenVideoRef.current.currentTime = 0;
      sirenVideoRef.current.play().catch(() => {});
    }
  };

  const applyVolumePreset = (presetPercent: number) => {
    if (presetPercent === 0) {
      setIsMuted(true);
      setVolumePercent(0);
    } else {
      setIsMuted(false);
      setVolumePercent(presetPercent);
    }
  };

  const enforceSilentStageVideo = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget;
    if (!vid.muted || vid.volume !== 0) {
      vid.muted = true;
      vid.volume = 0;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={
        isAr
          ? 'محاكاة الطوارئ والإخلاء الافتراضي الحية من ٥ مراحل'
          : 'Live 5-Stage Virtual Emergency Evacuation Simulation'
      }
      data-testid="emergency-simulation-overlay"
      className={`fixed inset-0 z-50 overflow-y-auto bg-[#FAF8F5] text-slate-900 ${
        isCompleted
          ? 'ring-4 ring-inset ring-[#10B981]'
          : 'animate-emergency-border'
      }`}
    >
      {/* Ambient Background Soft Wash */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: isCompleted
            ? 'linear-gradient(180deg, rgba(236, 253, 245, 0.92) 0%, rgba(250, 248, 245, 0.96) 100%)'
            : 'linear-gradient(180deg, rgba(254, 242, 242, 0.85) 0%, rgba(255, 251, 235, 0.92) 100%)',
        }}
      />

      {/* Foreground Single-Page Simulation Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 py-4 space-y-4">
        {/* TOP BAR: School Identity + Alert Status + Timers + Controls */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-3.5 sm:px-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
          {/* Left: Official Logos & School Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <img
                src="/images/moe.png"
                alt="MoE"
                referrerPolicy="no-referrer"
                className="h-9 w-9 object-contain"
              />
              <img
                src="/images/ataa_logoo.png"
                alt="Ataa"
                referrerPolicy="no-referrer"
                className="h-9 w-9 object-contain"
              />
              <img
                src="/images/meis_logoo.png"
                alt="MEIS AlMuruj"
                referrerPolicy="no-referrer"
                className="h-9 w-9 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xs sm:text-sm font-extrabold text-slate-900">
                  {isAr
                    ? 'مدرسة الشرق الأوسط العالمية - المروج'
                    : 'MEIS AlMuruj — 5-Stage Live Emergency Simulation'}
                </span>
              </div>
              <div className="text-[11px] font-bold text-[#D97706]">
                {isAr
                  ? 'إنذار طوارئ نشط · أكمل المراحل الخمس بالتتابع'
                  : 'Active Emergency Drill · Complete All 5 Safety Stages Step-by-Step'}
              </div>
            </div>
          </div>

          {/* Center: Compact Target Countdown & Stopwatch */}
          <div className="flex items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-2xl bg-[#FFFBEB] border border-[#F59E0B] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D97706] shrink-0" aria-hidden="true" />
              <div>
                <div className="text-[10px] font-bold text-[#B45309] leading-none">
                  {isAr ? 'العد التنازلي' : 'Target Timer'}
                </div>
                <div
                  dir="ltr"
                  data-testid="countdown-timer"
                  className="font-mono text-base sm:text-lg font-extrabold text-[#D97706] tabular-nums leading-tight"
                >
                  {formatTimeMMSS(countdownRemaining)}
                </div>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center gap-2">
              <div>
                <div className="text-[10px] font-bold text-slate-600 leading-none">
                  {isAr ? 'الزمن المنقضي' : 'Elapsed Time'}
                </div>
                <div
                  dir="ltr"
                  data-testid="elapsed-stopwatch"
                  className="font-mono text-base sm:text-lg font-extrabold text-slate-900 tabular-nums leading-tight"
                >
                  {formatTimeMMSS(elapsedSeconds)}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Language Toggle & Exit Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />
              <span>{isAr ? '🌐 English' : '🌐 العربية'}</span>
            </button>

            <button
              type="button"
              onClick={onCloseSimulation}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
              <span>{isAr ? 'إنهاء والعودة' : 'Exit Drill'}</span>
            </button>
          </div>
        </div>

        {/* 5-STAGE STEPPER BAR (Matches Attached Reference Order: 01 -> 02 -> 03 -> 04 -> 05) */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
            <span className="text-xs font-extrabold text-slate-800">
              {isCompleted
                ? isAr
                  ? '✅ اكتملت جميع المراحل الخمس بنجاح!'
                  : '✅ All 5 Emergency Stages Completed!'
                : isAr
                ? `المرحلة الحالية: ${currentStageIndex + 1} من 5 — (${activeStage.titleAr})`
                : `Current Stage: ${currentStageIndex + 1} of 5 — (${activeStage.titleEn})`}
            </span>
            <span dir="ltr" className="font-mono text-xs font-extrabold text-[#EF4444]">
              {performance.completedStagesCount} / 5 ({performance.progressPercent}%)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {STAGES.map((stage, idx) => {
              const isStageDone = stageTimes[idx] !== null;
              const isCurrent = !isCompleted && idx === currentStageIndex;
              return (
                <button
                  key={stage.stageNumber}
                  type="button"
                  onClick={() => handleSelectStageTab(idx)}
                  data-testid={`stage-step-tab-${stage.stageNumber}`}
                  className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-2xl border text-start transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-50/90 border-2 border-[#F59E0B] shadow-xs'
                      : isStageDone
                      ? 'bg-emerald-50/70 border border-emerald-300'
                      : 'bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-extrabold shrink-0 ${
                        isStageDone
                          ? 'bg-[#10B981] text-white'
                          : isCurrent
                          ? 'bg-[#F59E0B] text-slate-950'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isStageDone ? '✓' : stage.codeLabel}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 truncate">
                      {isAr ? stage.shortTabAr : stage.shortTabEn}
                    </span>
                  </div>
                  {stageTimes[idx] !== null && (
                    <span
                      dir="ltr"
                      className="text-[10px] font-mono font-bold text-[#059669] shrink-0"
                    >
                      {formatTimeMMSS(stageTimes[idx]!)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* COMPLETION SUMMARY BANNER (Shown when all 5 stages are finished) */}
        {isCompleted && (
          <div
            data-testid="drill-completion-card"
            className="bg-white border-2 border-[#10B981] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.2)] space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-[#10B981] flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25">
                  <ShieldCheck className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="text-xs font-extrabold text-[#059669]">
                    {isAr
                      ? 'الحالة: اكتملت المراحل الخمس بنجاح'
                      : 'STATUS: ALL 5 STAGES COMPLETED · DRILL COMPLETE'}
                  </div>
                  <h2
                    dir="ltr"
                    className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 text-start"
                  >
                    EVACUATION DRILL COMPLETED. All 5 safety stages verified.
                  </h2>
                  <p
                    dir="rtl"
                    className="text-lg sm:text-xl font-extrabold text-[#059669] text-start"
                    style={{ fontFamily: 'var(--font-ar)' }}
                  >
                    اكتمل تمرين الطوارئ والمراحل الخمس بنجاح. شكراً لتعاونكم والتزامكم بتعليمات السلامة.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleRestartSimulation}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm font-bold text-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>{isAr ? '🔄 إعادة المحاكاة من المرحلة ١' : '🔄 Restart 5-Stage Simulation'}</span>
                </button>
                <button
                  type="button"
                  onClick={onCloseSimulation}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-sm font-extrabold shadow-md shadow-emerald-500/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Home className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {isAr ? '🏠 العودة للصفحة الرئيسية' : '🏠 Return to Safety Portal'}
                  </span>
                </button>
              </div>
            </div>

            {/* 5-Stage Timestamps & Readiness Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100">
              {STAGES.map((st, idx) => (
                <div
                  key={st.stageNumber}
                  className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200"
                >
                  <div className="text-[11px] font-bold text-slate-600 truncate">
                    {isAr ? st.shortTabAr : st.shortTabEn}
                  </div>
                  <div
                    dir="ltr"
                    className="mt-1 font-mono text-lg font-extrabold text-[#059669] tabular-nums text-start"
                  >
                    ✓ {formatTimeMMSS(performance.stageTimesSeconds[idx] ?? elapsedSeconds)}
                  </div>
                </div>
              ))}

              <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border-2 border-[#10B981]">
                <div className="text-[11px] font-bold text-slate-600">
                  {isAr ? 'تقييم الجاهزية وحصر الطلاب' : 'Readiness & Roll Call'}
                </div>
                <div className="mt-0.5 text-xs font-extrabold text-[#059669] truncate">
                  {isAr ? performance.ratingAr : performance.ratingEn}
                </div>
                <div className="text-[11px] text-slate-700 font-mono font-bold mt-0.5">
                  {accountedStudents}/{totalStudents} {isAr ? 'طالب' : 'Students'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MAIN SINGLE-PAGE STAGE VIEW:
            - COMPLETE LEFT SIDE (7 Cols): Big Stage Visual (Muted Loop Video or Big Safety Image(s))
            - RIGHT SIDE UP (5 Cols Top): Short, Easy-to-Read Instructions with Icons + Complete Stage Button
            - RIGHT SIDE DOWN (5 Cols Bottom): Continuously Playing Siren Video.mp4 + Audio Volume Mixer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* =====================================================================
              LEFT SIDE (7 COLS): BIG STAGE-SPECIFIC MEDIA SHOWCASE
             ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className={`bg-white rounded-3xl p-4 sm:p-5 border-2 ${activeStage.accentBorderClass} shadow-md flex-1 flex flex-col justify-start gap-4`}
            >
              {/* STAGE 1 BIG MEDIA: /videos/Instruction Following.mp4 (Starts at Top, Continuous Loop, Strictly Muted) */}
              {activeStage.stageNumber === 1 && (
                <div className="space-y-4 flex flex-col">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 aspect-[16/9] w-full shadow-inner">
                    <video
                      key="stage-1-instruction-following-video"
                      ref={stageMutedVideoRef}
                      src="/videos/Instruction Following.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      onVolumeChange={enforceSilentStageVideo}
                      onPlay={enforceSilentStageVideo}
                      data-testid="stage1-muted-video"
                      className="w-full h-full object-cover pointer-events-none select-none"
                    />
                    {/* Top Overlay Badge & Audio Locked Indicator */}
                    <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-10">
                      <span className="px-3 py-1 rounded-xl bg-slate-950/85 text-white text-xs font-mono font-extrabold backdrop-blur-xs border border-white/20">
                        {isAr
                          ? 'المرحلة ١ من ٥ · العرض المرئي'
                          : 'STAGE 1 OF 5 · VISUAL GUIDE'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/90 text-white text-xs font-bold border border-white/20 backdrop-blur-xs">
                        <Lock className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
                        <VolumeX className="w-3.5 h-3.5 text-[#EF4444]" aria-hidden="true" />
                        <span>
                          {isAr ? 'فيديو صامت مستمر (مغلق الصوت)' : 'Continuous Loop · Audio Locked Muted'}
                        </span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-3.5 py-2 rounded-xl bg-slate-950/85 text-white text-xs sm:text-sm font-extrabold backdrop-blur-xs">
                        {isAr
                          ? '٠١. التوقف الفوري عن النشاط والاستماع بتركيز للمعلم'
                          : '01. Stop Activity & Listen Carefully to Teacher Instructions'}
                      </span>
                      <span
                        dir="ltr"
                        className="px-2.5 py-1 rounded-lg bg-slate-950/80 text-slate-200 font-mono text-[11px]"
                      >
                        /videos/Instruction Following.mp4
                      </span>
                    </div>
                  </div>

                  {/* Enriched & Enlarged Visual Reinforcement Strip below Stage 1 video */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                    <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/90 border-2 border-sky-200 flex flex-col justify-between gap-2 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0">
                        <HeartPulse className="w-6 h-6 text-[#0284C7]" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">
                          {isAr ? 'توقف عن الدرس فوراً' : 'Stop Activity Now'}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                          {isAr ? 'ضع الأقلام والكتب جانباً فور سماع الإنذار' : 'Put down pens & books right away'}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/90 border-2 border-teal-200 flex flex-col justify-between gap-2 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-white border border-teal-200 flex items-center justify-center shrink-0">
                        <VolumeX className="w-6 h-6 text-[#0D9488]" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">
                          {isAr ? 'التزم الصمت التام' : 'Complete Silence'}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                          {isAr ? 'الصمت يساعد الجميع على سماع صافرة الإنذار' : 'Maintain total quiet so all hear instructions'}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/90 border-2 border-emerald-200 flex flex-col justify-between gap-2 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                        <UserCheck className="w-6 h-6 text-[#059669]" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">
                          {isAr ? 'انتبه لتوجيه المعلم' : 'Eyes on Teacher'}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                          {isAr ? 'استمع بدقة للتوجيه التالي دون هلع' : 'Follow teacher step-by-step with calm focus'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2 BIG MEDIA: /images/Glass Safety.jpg */}
              {activeStage.stageNumber === 2 && (
                <div className="space-y-4 flex flex-col">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-red-200 aspect-[16/9] w-full shadow-inner">
                    <img
                      src="/images/Glass Safety.jpg"
                      alt={
                        isAr
                          ? 'الابتعاد عن النوافذ والزجاج - حافظ على مسافة آمنة'
                          : 'Window Safety - Keep Away from Glass and Windows'
                      }
                      referrerPolicy="no-referrer"
                      data-testid="stage2-glass-safety-img"
                      className="w-full h-full object-contain bg-slate-950"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-3.5 py-2 rounded-xl bg-slate-950/85 text-white text-xs sm:text-sm font-extrabold backdrop-blur-xs">
                        {isAr
                          ? '٠٢. الابتعاد التام عن النوافذ والواجهات الزجاجية'
                          : '02. Move Away from Windows & Exterior Glass'}
                      </span>
                      <span
                        dir="ltr"
                        className="px-2.5 py-1 rounded-lg bg-slate-950/80 text-white font-mono text-[11px]"
                      >
                        /images/Glass Safety.jpg
                      </span>
                    </div>
                  </div>

                  {/* Enlarged Key Visual Callouts matching Glass Safety.jpg on Desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-4 sm:p-5 rounded-2xl bg-red-50/90 border-2 border-red-200 flex items-start gap-4 shadow-xs">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-red-200 flex items-center justify-center shrink-0">
                        <WindowClearanceIcon className="w-6 h-6 text-[#EF4444]" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">
                          {isAr
                            ? '١. مسافة آمنة (متر واحد / ٣ أقدام)'
                            : '1. Safe Distance: At Least 1m (3ft) Back'}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-slate-700 mt-1 leading-relaxed">
                          {isAr
                            ? 'ابتعد فوراً عن جميع النوافذ والواجهات الزجاجية الخارجية والأسقف المعلقة.'
                            : 'Step completely clear of all exterior windows, glass walls, and hanging fixtures.'}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-200 flex items-start gap-4 shadow-xs">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-amber-200 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6 text-[#D97706]" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">
                          {isAr
                            ? '٢. يمنع اللمس أو الاستناد على الزجاج'
                            : '2. Do Not Touch, Lean, or Play Near Glass'}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-slate-700 mt-1 leading-relaxed">
                          {isAr
                            ? 'للوقاية من خطر السقوط أو كسر الزجاج والتناثر أثناء الإنذار الطارئ.'
                            : 'Strictly prohibited to prevent falls, shattering, or accidental glass breakage.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3 BIG MEDIA: /videos/Hiding Under Table.mp4 (Starts at Top, Continuous Loop, Strictly Muted) */}
              {activeStage.stageNumber === 3 && (
                <div className="space-y-4 flex flex-col">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-amber-200 aspect-[16/9] w-full shadow-inner">
                    <video
                      key="stage-3-hiding-under-table-video"
                      ref={stageMutedVideoRef}
                      src="/videos/Hiding Under Table.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      onVolumeChange={enforceSilentStageVideo}
                      onPlay={enforceSilentStageVideo}
                      data-testid="stage3-muted-video"
                      className="w-full h-full object-cover pointer-events-none select-none"
                    />
                    {/* Top Overlay Badge & Audio Locked Indicator */}
                    <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-10">
                      <span className="px-3 py-1 rounded-xl bg-slate-950/85 text-white text-xs font-mono font-extrabold backdrop-blur-xs border border-white/20">
                        {isAr
                          ? 'المرحلة ٣ من ٥ · العرض المرئي'
                          : 'STAGE 3 OF 5 · VISUAL GUIDE'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/90 text-white text-xs font-bold border border-white/20 backdrop-blur-xs">
                        <Lock className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
                        <VolumeX className="w-3.5 h-3.5 text-[#EF4444]" aria-hidden="true" />
                        <span>
                          {isAr ? 'فيديو صامت مستمر (مغلق الصوت)' : 'Continuous Loop · Audio Locked Muted'}
                        </span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-3.5 py-2 rounded-xl bg-slate-950/85 text-white text-xs sm:text-sm font-extrabold backdrop-blur-xs">
                        {isAr
                          ? '٠٣. انزل تحت الطاولة واحمِ الرأس والرقبة بكلتا اليدين'
                          : '03. Drop Underneath Your Desk & Protect Head and Neck'}
                      </span>
                      <span
                        dir="ltr"
                        className="px-2.5 py-1 rounded-lg bg-slate-950/80 text-slate-200 font-mono text-[11px]"
                      >
                        /videos/Hiding Under Table.mp4
                      </span>
                    </div>
                  </div>

                  {/* Enlarged 3-Step Posture Strip on Desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-200 flex flex-col justify-between gap-2 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center shrink-0">
                        <ArrowDownRight className="w-6 h-6 text-[#D97706]" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">
                          {isAr ? '١. انزل (DROP)' : '1. DROP to Knees'}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                          {isAr ? 'انزل على ركبتيك ويديك فوراً للحفاظ على ثباتك' : 'Drop onto hands and knees beside your desk'}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/90 border-2 border-orange-200 flex flex-col justify-between gap-2 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-white border border-orange-200 flex items-center justify-center shrink-0">
                        <DeskShelterIcon className="w-6 h-6 text-[#EA580C]" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">
                          {isAr ? '٢. احتمِ (COVER)' : '2. COVER Under Desk'}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                          {isAr ? 'ادخل بالكامل تحت الطاولة لحماية جسمك' : 'Shield head, torso and body completely beneath desk'}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-red-50/90 border-2 border-red-200 flex flex-col justify-between gap-2 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-white border border-red-200 flex items-center justify-center shrink-0">
                        <HeadNeckPostureIcon className="w-6 h-6 text-[#DC2626]" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">
                          {isAr ? '٣. تمسّك (HOLD)' : '3. HOLD & Shield Neck'}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                          {isAr ? 'شبّك اليدين خلف الرأس وأمسك بقائمة الطاولة' : 'Interlock hands over neck & grip desk leg firmly'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 4 BIG MEDIA: /images/Breathing technique.jpg + Live 4-4-8 Pacer */}
              {activeStage.stageNumber === 4 && (
                <div className="space-y-4 flex flex-col">
                  <div className="relative rounded-2xl overflow-hidden bg-white border border-teal-200 aspect-[16/9] w-full shadow-inner">
                    <img
                      src="/images/Breathing technique.jpg"
                      alt={
                        isAr
                          ? 'تقنية التنفس ٤-٤-٨ لتهدئة العقل والجسم'
                          : '4-4-8 Breathing Technique - Inhale 4s, Hold 4s, Exhale 8s'
                      }
                      referrerPolicy="no-referrer"
                      data-testid="stage4-breathing-img"
                      className="w-full h-full object-contain bg-white"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-3.5 py-2 rounded-xl bg-slate-950/85 text-white text-xs sm:text-sm font-extrabold backdrop-blur-xs">
                        {isAr
                          ? '٠٤. تهدئة النفس وتطبيق تقنية التنفس ٤-٤-٨'
                          : '04. Calm Yourself · 4-4-8 Calming Breathing Technique'}
                      </span>
                      <span
                        dir="ltr"
                        className="px-2.5 py-1 rounded-lg bg-slate-950/75 text-white font-mono text-[11px]"
                      >
                        /images/Breathing technique.jpg
                      </span>
                    </div>
                  </div>

                  {/* Enlarged Interactive Live 4-4-8 Breathing Rhythm Bar on Desktop */}
                  <div className="p-4 sm:p-6 rounded-2xl bg-teal-50/95 border-2 border-teal-200 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#0D9488] text-white flex flex-col items-center justify-center font-mono font-extrabold shrink-0 shadow-md shadow-teal-700/20">
                        <span dir="ltr" className="text-lg sm:text-xl leading-none">
                          {breathingInfo.secondsRemainingInPhase}s
                        </span>
                        <span className="text-[10px] opacity-80 mt-0.5">4-4-8</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg font-extrabold text-slate-900">
                            {isAr ? breathingInfo.phaseLabelAr : breathingInfo.phaseLabelEn}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-teal-100 text-[#0D9488] font-mono text-xs font-bold">
                            {isAr ? 'دليل أزمات عطاء' : 'Ataa 4-4-8 Rhythm'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                          {isAr ? breathingInfo.instructionAr : breathingInfo.instructionEn}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsBreathingPaused((prev) => !prev)}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-teal-300 text-xs sm:text-sm font-extrabold text-[#0D9488] transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      {isBreathingPaused
                        ? isAr
                          ? '▶ استئناف العد'
                          : '▶ Resume 4-4-8 Counter'
                        : isAr
                        ? '⏸ إيقاف مؤقت'
                        : '⏸ Pause Counter'}
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 5 BIG MEDIA: /images/Student In Line.jpg on Top + Grade Evacuation Plan at Bottom */}
              {activeStage.stageNumber === 5 && (
                <div className="space-y-4 flex flex-col">
                  {/* Top: Student In Line Image (Assembly point 3 images removed as requested) */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-emerald-200 aspect-[16/9] w-full shadow-inner">
                    <img
                      src="/images/Student In Line.jpg"
                      alt={
                        isAr
                          ? 'طلاب يسيرون في صف فردي منتظم بإشراف المعلم'
                          : 'Students Moving in Proper Single-File Line'
                      }
                      referrerPolicy="no-referrer"
                      data-testid="stage5-student-in-line-img"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-3.5 flex items-end justify-between gap-2 pointer-events-none">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#10B981] text-white text-[10px] font-extrabold mb-1">
                          {isAr ? 'صف فردي منتظم · استخدام الدرج فقط' : 'Orderly Line · Stairs Only'}
                        </span>
                        <div className="text-xs sm:text-sm font-extrabold text-white">
                          {isAr
                            ? 'السير في صف منتظم خلف المعلم دون تدافع أو ركض'
                            : 'Orderly Single-File Movement to Designated Destinations'}
                        </div>
                      </div>
                      <span
                        dir="ltr"
                        className="px-2.5 py-1 rounded-lg bg-slate-950/80 text-slate-200 font-mono text-[11px]"
                      >
                        /images/Student In Line.jpg
                      </span>
                    </div>
                  </div>

                  {/* Bottom Section: Grade-by-Grade Evacuation Destination Plan (Enlarged on Desktop) */}
                  <div className="bg-[#FAF8F5] border-2 border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#059669]" />
                        <span className="text-sm sm:text-base font-extrabold text-slate-900">
                          {isAr ? 'خطة إخلاء المراحل والصفوف الدراسية' : 'Grade Evacuation Destinations Plan'}
                        </span>
                      </div>

                      {/* Department Filter Pills */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEvacFilter('all')}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            evacFilter === 'all'
                              ? 'bg-[#059669] text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {isAr ? 'الكل' : 'All'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEvacFilter('kg')}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            evacFilter === 'kg'
                              ? 'bg-[#059669] text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          KG
                        </button>
                        <button
                          type="button"
                          onClick={() => setEvacFilter('primary')}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            evacFilter === 'primary'
                              ? 'bg-[#059669] text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {isAr ? 'الابتدائي' : 'Primary'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEvacFilter('girls')}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            evacFilter === 'girls'
                              ? 'bg-[#059669] text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {isAr ? 'بنات' : 'Girls'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEvacFilter('boys')}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            evacFilter === 'boys'
                              ? 'bg-[#059669] text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {isAr ? 'بنين' : 'Boys'}
                        </button>
                      </div>
                    </div>

                    {/* Scrollable, Clean Evacuation List (Enlarged on Desktop) */}
                    <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-2.5 pr-1">
                      {GRADE_EVACUATION_PLAN.filter((item) => {
                        if (evacFilter === 'all') return true;
                        if (evacFilter === 'kg') return item.id.startsWith('kg');
                        if (evacFilter === 'primary') return item.id.startsWith('primary');
                        if (evacFilter === 'girls') return item.id.startsWith('girls');
                        if (evacFilter === 'boys') return item.id.startsWith('boys');
                        return true;
                      }).map((item) => (
                        <div
                          key={item.id}
                          className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs hover:border-emerald-300 transition-colors"
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-extrabold text-sm sm:text-base text-[#D97706]">
                                {isAr ? item.gradeGroupAr : item.gradeGroupEn}
                              </span>
                              <span className="text-xs text-slate-500 font-bold px-2 py-0.5 rounded bg-slate-100">
                                {isAr ? item.departmentAr : item.departmentEn}
                              </span>
                            </div>
                            {item.subLocationEn && (
                              <div className="text-xs sm:text-sm font-medium text-slate-700">
                                📍 {isAr ? item.subLocationAr : item.subLocationEn}
                              </div>
                            )}
                          </div>

                          <div className="shrink-0 pt-1 sm:pt-0">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-[#047857] font-extrabold text-xs sm:text-sm border border-emerald-200">
                              <MapPin className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                              <span>{isAr ? item.evacuationLocationAr : item.evacuationLocationEn}</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =====================================================================
              RIGHT SIDE (5 COLS):
              - RIGHT SIDE UP: Stage Instructions (Short Points + Icons) & Next Stage Button
              - RIGHT SIDE DOWN: Continuous Siren Video.mp4 Player + Volume Mixer
             ===================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            {/* RIGHT SIDE UP: Proper Stage Instructions in Short Points with Icons + Complete Stage CTA */}
            <div
              data-testid="stage-instructions-card"
              className={`bg-white rounded-3xl p-5 sm:p-6 border-2 ${activeStage.accentBorderClass} shadow-md flex-1 flex flex-col justify-between gap-4`}
            >
              <div>
                {/* Stage Card Header (Styled like the attached reference cards) */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${activeStage.headerIconBoxClass}`}
                  >
                    {activeStage.headerIcon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-extrabold text-slate-500">
                        {isAr
                          ? `المرحلة ${activeStage.stageNumber} من ٥`
                          : `STAGE 0${activeStage.stageNumber} OF 05`}
                      </span>
                      {stageTimes[currentStageIndex] !== null && (
                        <span
                          dir="ltr"
                          className="text-xs font-mono font-extrabold text-[#059669]"
                        >
                          ✓ {formatTimeMMSS(stageTimes[currentStageIndex]!)}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                      {isAr ? activeStage.titleAr : activeStage.titleEn}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                      {isAr ? activeStage.summaryAr : activeStage.summaryEn}
                    </p>
                  </div>
                </div>

                {/* Short & Easy-to-Read Instruction Points with Icons */}
                <div className="space-y-2.5">
                  {activeStage.points.map((pt, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-slate-200/90"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${pt.iconBgClass}`}
                      >
                        {pt.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                          {isAr ? pt.titleAr : pt.titleEn}
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed mt-0.5">
                          {isAr ? pt.descAr : pt.descEn}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Class Roll-Call Counter on Stage 5 */}
                {activeStage.stageNumber === 5 && (
                  <div className="mt-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#059669] shrink-0" aria-hidden="true" />
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">
                          {isAr ? 'حصر الطلاب في نقطة التجمع' : 'Assembly Roll Call'}
                        </div>
                        <div className="text-[11px] font-medium text-slate-600">
                          {isAr ? 'تحقق من اكتمال عدد الفصل' : 'Verify all students present'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setAccountedStudents((prev) => Math.max(0, prev - 1))}
                        aria-label={isAr ? 'إنقاص عدد الطلاب' : 'Decrease accounted students'}
                        className="p-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span
                        dir="ltr"
                        className="font-mono text-sm font-extrabold text-[#059669] px-1.5 tabular-nums"
                      >
                        {accountedStudents}/{totalStudents}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setAccountedStudents((prev) => {
                            const next = prev + 1;
                            if (next > totalStudents) setTotalStudents(next);
                            return next;
                          })
                        }
                        aria-label={isAr ? 'زيادة عدد الطلاب' : 'Increase accounted students'}
                        className="p-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Stage Navigation & Completion CTA Buttons (Fixed for Mobile & Desktop) */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap sm:flex-nowrap items-center gap-2">
                {currentStageIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStageIndex((prev) => Math.max(0, prev - 1))}
                    data-testid="prev-stage-btn"
                    className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-extrabold text-slate-700 transition-colors shrink-0 cursor-pointer"
                  >
                    {isAr ? 'السابق' : 'Back'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCompleteCurrentStage}
                  data-testid="complete-stage-btn"
                  className="w-full flex-1 py-3 px-3.5 sm:px-4 rounded-2xl font-display text-xs sm:text-sm font-extrabold text-white shadow-md transition-all hover:brightness-105 flex items-center justify-center gap-2 min-w-0 cursor-pointer text-center"
                  style={{
                    background: activeStage.buttonGradient,
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    {isAr ? activeStage.completeBtnAr : activeStage.completeBtnEn}
                  </span>
                  {isAr ? (
                    <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT SIDE DOWN: Continuously Playing "Siren Video.mp4" + Teacher Volume Mixer */}
            <div
              data-testid="siren-audio-controller"
              className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#EF4444] shadow-md space-y-3.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EF4444] flex items-center justify-center shrink-0">
                    <Siren className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">
                      {isAr
                        ? 'بث صافرة الإنذار المستمر (Siren Video.mp4)'
                        : 'Continuous Live Siren Video (Siren Video.mp4)'}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500">
                      {isAr
                        ? 'يعمل باستمرار أثناء التنقل بين المراحل الخمس'
                        : 'Plays continuously across all 5 emergency stages'}
                    </div>
                  </div>
                </div>

                <span
                  dir="ltr"
                  className="px-2 py-0.5 rounded-md bg-red-50 border border-red-200 text-[#EF4444] font-mono text-[11px] font-bold"
                >
                  {isMuted ? '0%' : `${volumePercent}%`}
                </span>
              </div>

              {/* Right-Down Live Siren Video Player + Audio Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                <div className="sm:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#EF4444] bg-slate-950 aspect-video shadow-xs">
                    <video
                      ref={sirenVideoRef}
                      src="/videos/Siren Video.mp4"
                      poster="/images/Building 1.jpg"
                      autoPlay
                      loop
                      playsInline
                      controls
                      data-testid="live-siren-video-player"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Volume Slider & Presets */}
                <div className="sm:col-span-6 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="siren-volume-slider"
                      className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800"
                    >
                      {isMuted || volumePercent === 0 ? (
                        <VolumeX className="w-4 h-4 text-[#EF4444]" aria-hidden="true" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#D97706]" aria-hidden="true" />
                      )}
                      <span>{isAr ? 'مستوى صوت الإنذار' : 'Siren Audio Volume'}</span>
                    </label>
                  </div>

                  <input
                    id="siren-volume-slider"
                    type="range"
                    min={0}
                    max={100}
                    value={isMuted ? 0 : volumePercent}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setVolumePercent(val);
                      setIsMuted(val === 0);
                    }}
                    aria-label={
                      isAr
                        ? 'شريط التحكم بمستوى صوت صافرة الإنذار'
                        : 'Siren Audio Volume Slider'
                    }
                    className="w-full accent-[#EF4444] cursor-pointer"
                  />

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => applyVolumePreset(100)}
                      className={`px-2 py-1.5 rounded-xl text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        !isMuted && volumePercent === 100
                          ? 'bg-[#F59E0B] text-slate-950'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isAr ? '100% كامل' : '100% Full'}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyVolumePreset(50)}
                      className={`px-2 py-1.5 rounded-xl text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        !isMuted && volumePercent === 50
                          ? 'bg-[#F59E0B] text-slate-950'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isAr ? '50% متوسط' : '50% Medium'}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyVolumePreset(20)}
                      className={`px-2 py-1.5 rounded-xl text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        !isMuted && volumePercent === 20
                          ? 'bg-[#F59E0B] text-slate-950'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isAr ? '20% صوت المعلم' : '20% Teacher Voice'}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyVolumePreset(0)}
                      className={`px-2 py-1.5 rounded-xl text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        isMuted || volumePercent === 0
                          ? 'bg-[#EF4444] text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isAr ? 'كتم 🔇' : 'Mute 🔇'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
