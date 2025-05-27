
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية الفصحى' },
    { code: 'ar-IQ', name: 'عراقي', flag: '🇮🇶', nativeName: 'اللهجة العراقية' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
  ];

  const changeLanguage = (lng: string) => {
    console.log('تغيير اللغة إلى:', lng);
    i18n.changeLanguage(lng);
    document.dir = lng.startsWith('ar') ? 'rtl' : 'ltr';
    localStorage.setItem('octagram-language', lng);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2 text-white hover:bg-white/20">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="text-xs">{currentLanguage.code === 'ar-IQ' ? 'عراقي' : currentLanguage.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border shadow-lg">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="gap-3 cursor-pointer hover:bg-blue-50"
          >
            <span>{language.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs text-gray-500">{language.nativeName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
