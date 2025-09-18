import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutSettingService } from '../../layouts/layout-setting.service';

export interface LanguageData {
  text: string;
  flag: string;
  lang: string;
}

@Injectable({ providedIn: 'root' })
export class LanguageService {

  languages: LanguageData[] = [
    { text: 'English', flag: 'assets/images/flag/us.svg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flag/es.svg', lang: 'es' },
    { text: 'French', flag: 'assets/images/flag/fr.svg', lang: 'de' },
    { text: 'Russian', flag: 'assets/images/flag/ru.svg', lang: 'it' },
    { text: 'German', flag: 'assets/images/flag/de.svg', lang: 'ru' },
    { text: 'Italian', flag: 'assets/images/flag/it.svg', lang: 'ch' },
    { text: 'Chinese', flag: 'assets/images/flag/cn.svg', lang: 'fr' },
    { text: 'Arabic', flag: 'assets/images/flag/sa.svg', lang: 'ar' },
    { text: 'Turkish', flag: 'assets/images/flag/tr.svg', lang: 'tr' },
    { text: 'Hebrew', flag: 'assets/images/flag/il.svg', lang: 'he' },
    { text: 'Vietnamese', flag: 'assets/images/flag/vn.svg', lang: 'vi' },
    { text: 'Dutch', flag: 'assets/images/flag/nl.svg', lang: 'nl' },
    { text: 'Korean', flag: 'assets/images/flag/kr.svg', lang: 'ko' },
    { text: 'Portuguese', flag: 'assets/images/flag/pt.svg', lang: 'pt' },
  ];

  selectedLanguage: LanguageData | undefined = { text: 'English', flag: 'assets/images/flag/us.svg', lang: 'en' };

  constructor(public translate: TranslateService, private settingService: LayoutSettingService) { }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.selectedLanguage = this.languages.find(x => x.lang === lang);

    this.saveSettingsToLocalStorage(lang)
  }

  getStoredSettings() {
    const storedSettings = localStorage.getItem('selectedLanguage');
    return storedSettings ? JSON.parse(storedSettings) : 'en';
  }

  private saveSettingsToLocalStorage(lang: string) {
    localStorage.setItem('selectedLanguage', JSON.stringify(lang));
  }

}
