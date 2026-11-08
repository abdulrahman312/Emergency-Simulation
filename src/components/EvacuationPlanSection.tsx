import React, { useState } from 'react';
import { Compass, MapPin, Building2, DoorOpen, GraduationCap, Users } from 'lucide-react';
import { Language } from '../utils/simulationLogic';
import { GRADE_EVACUATION_PLAN, GradeEvacuationPlanItem } from '../data/portalContent';

interface EvacuationPlanSectionProps {
  lang: Language;
}

export const EvacuationPlanSection: React.FC<EvacuationPlanSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [filterDepartment, setFilterDepartment] = useState<'all' | 'kg' | 'primary' | 'girls' | 'boys'>('all');

  const filteredPlan = GRADE_EVACUATION_PLAN.filter((item) => {
    if (filterDepartment === 'all') return true;
    if (filterDepartment === 'kg') return item.id.startsWith('kg');
    if (filterDepartment === 'primary') return item.id.startsWith('primary');
    if (filterDepartment === 'girls') return item.id.startsWith('girls');
    if (filterDepartment === 'boys') return item.id.startsWith('boys');
    return true;
  });

  return (
    <section id="evacuation-plan" className="py-14 border-b border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D9488] mb-2">
            <Compass className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
            <span>
              {isAr
                ? '٠٤. خطة إخلاء المراحل والصفوف الدراسية ومواقع التجمع الداخلية'
                : '04. Official Grade-Level Evacuation Plan & Designated Staging Zones'}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            {isAr
              ? 'خطة الإخلاء المعتمدة للأقسام والمراحل الدراسية'
              : 'Grade-by-Grade Evacuation Destination Plan'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
            {isAr
              ? 'تحدد الخطة المعتمدة لكل قسم وصف دراسي مسار الإخلاء والموقع المحدد للاحتماء أو التجمع الداخلي. يتم ذكر البيانات المحددة والمعتمدة فقط لكل مرحلة لضمان الدقة والوضوح.'
              : 'Official emergency evacuation destinations for each grade and department. Shows verified department, starting location, exit route, and assigned evacuation destination.'}
          </p>
        </div>

        {/* Department Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl w-fit border border-slate-200/80">
          <button
            type="button"
            onClick={() => setFilterDepartment('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterDepartment === 'all'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'جميع الأقسام' : 'All Departments'}
          </button>
          <button
            type="button"
            onClick={() => setFilterDepartment('kg')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterDepartment === 'kg'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'رياض الأطفال (KG)' : 'Kindergarten (KG)'}
          </button>
          <button
            type="button"
            onClick={() => setFilterDepartment('primary')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterDepartment === 'primary'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'الصفوف الأولية' : 'Primary Grades'}
          </button>
          <button
            type="button"
            onClick={() => setFilterDepartment('girls')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterDepartment === 'girls'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'قسم البنات' : "Girls' Section"}
          </button>
          <button
            type="button"
            onClick={() => setFilterDepartment('boys')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterDepartment === 'boys'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'قسم البنين' : "Boys' Section"}
          </button>
        </div>

        {/* Clean, Responsive Evacuation Plan Cards & Table */}
        <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-start text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/90 text-slate-700 font-extrabold">
                  <th className="py-4 px-5 text-start font-display">
                    {isAr ? 'القسم / الإدارة' : 'Department / Section'}
                  </th>
                  <th className="py-4 px-5 text-start font-display">
                    {isAr ? 'المرحلة / الصف الدراسي' : 'Grade / Group'}
                  </th>
                  <th className="py-4 px-5 text-start font-display">
                    {isAr ? 'الموقع الحالي / الدور' : 'Area / Floor / Sub-location'}
                  </th>
                  <th className="py-4 px-5 text-start font-display">
                    {isAr ? 'موقع الإخلاء المحدد' : 'Evacuation Location'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPlan.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Department */}
                    <td className="py-4 px-5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#0D9488] shrink-0" aria-hidden="true" />
                        <span>{isAr ? row.departmentAr : row.departmentEn}</span>
                      </div>
                    </td>

                    {/* Grade / Group */}
                    <td className="py-4 px-5 font-extrabold text-[#D97706]">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#D97706] shrink-0" aria-hidden="true" />
                        <span>{isAr ? row.gradeGroupAr : row.gradeGroupEn}</span>
                      </div>
                    </td>

                    {/* Sub-Location (Only if available) */}
                    <td className="py-4 px-5 text-slate-700">
                      {row.subLocationEn ? (
                        <span className="font-semibold text-slate-800">
                          {isAr ? row.subLocationAr : row.subLocationEn}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal italic">
                          {isAr ? 'فصول القسم المحددة' : 'Standard Department Classrooms'}
                        </span>
                      )}
                    </td>

                    {/* Evacuation Location */}
                    <td className="py-4 px-5 font-bold text-slate-900">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#047857]">
                        <MapPin className="w-4 h-4 text-[#059669] shrink-0" aria-hidden="true" />
                        <span>{isAr ? row.evacuationLocationAr : row.evacuationLocationEn}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-Based Grid View */}
          <div className="md:hidden divide-y divide-slate-100 p-3 space-y-3">
            {filteredPlan.map((row) => (
              <div
                key={row.id}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/90 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span className="font-extrabold text-sm text-[#D97706]">
                      {isAr ? row.gradeGroupAr : row.gradeGroupEn}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {isAr ? row.departmentAr : row.departmentEn}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {row.subLocationEn && (
                    <div className="flex items-center gap-2 text-slate-700">
                      <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{isAr ? row.subLocationAr : row.subLocationEn}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1 font-extrabold text-[#059669]">
                    <MapPin className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>{isAr ? row.evacuationLocationAr : row.evacuationLocationEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
