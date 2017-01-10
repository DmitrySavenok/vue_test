import 'es6-promise';

// var autoprefixer = require('autoprefixer');

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';


// Export to a hseparate module?

const locales = {
	eng: {
		message: {
			header: "RIMI LMS 3.0 (ENG)"
		},
		goals: {
			addNewText: 'Add an information about the task (ENG)'
		},
		howToSections: {
			Section1: {
				sectionTitle: 'Learn from colleagues eng',
				sectionDescription: 'Learn from colleagues description here eng',
				sectionTexts: {
					text1: 'Vai Tu zini, ko vēlies attīstīt? eng',
					options1: ['Nē, es īsti nezinu, ak ko sākt', 'Aptuveni zinu, bet nespēju konkrēti nodefinēt', 'Diezgan skaidri zinu, ko vēlos attīstīt'],
					text2: 'Attīstības mērķi ir zināšanas, prasmes, attieksme vai uzvedība, kas jāiegūst vai jāpilnveido, lai Tu veicinātu savu izaugsmi, uzlabotu darba uzpildi un sasniegnu Tev uzliktos biznesa mērķus. eng',
					text3: 'Savā pašreizējā amatā esmu sasniedzis zināsanu un prasmju griestus eng',
					options2: ['JĀ, esmu gatavs jauniem izaicinājumiem', 'NĒ, man šajā jomā vēl ir kur augt'],
					options3: ['Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt']
				}
			},
			Section2: {
				sectionTitle: 'Mācies darba vietā eng',
				sectionDescription: 'Macies darba vieta description here eng',
				sectionTexts: {}
			},
			Section3: {
				sectionTitle: 'Izzini pats',
				sectionDescription: 'Izzini pats section description here eng',
				sectionTexts: {}
			},
			Section4: {
				sectionTitle: 'Apmeklē kursus',
				sectionDescription: 'Apmeklē kursus description here eng',
				sectionTexts: {}
			}
		},
		popups: {
			goalQm: 'Goal QM popup text here ENG',
			goalInfo: 'Goal Info popup text here ENG'
		}
	},
	ee: {
		message: {
			header: "RIMI LMS 3.0 (EE)"
		},
		goals: {
			addNewText: 'Add an information about the task (EE)'
		},
		howToSections: {
			Section1: {
				sectionTitle: 'Learn from colleagues ee',
				sectionDescription: 'Learn from colleagues description here ee',
				sectionTexts: {
					text1: 'Vai Tu zini, ko vēlies attīstīt? ee',
					options1: ['Nē, es īsti nezinu, ak ko sākt', 'Aptuveni zinu, bet nespēju konkrēti nodefinēt', 'Diezgan skaidri zinu, ko vēlos attīstīt'],
					text2: 'Attīstības mērķi ir zināšanas, prasmes, attieksme vai uzvedība, kas jāiegūst vai jāpilnveido, lai Tu veicinātu savu izaugsmi, uzlabotu darba uzpildi un sasniegnu Tev uzliktos biznesa mērķus. ee',
					text3: 'Savā pašreizējā amatā esmu sasniedzis zināsanu un prasmju griestus ee',
					options2: ['JĀ, esmu gatavs jauniem izaicinājumiem', 'NĒ, man šajā jomā vēl ir kur augt'],
					options3: ['Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt']
				}
			},
			Section2: {
				sectionTitle: 'Mācies darba vietā ee',
				sectionDescription: 'Macies darba vieta description here ee',
				sectionTexts: {}
			},
			Section3: {
				sectionTitle: 'Izzini pats',
				sectionDescription: 'Izzini pats section description here ee',
				sectionTexts: {}
			},
			Section4: {
				sectionTitle: 'Apmeklē kursus',
				sectionDescription: 'Apmeklē kursus description here ee',
				sectionTexts: {}
			}
		},
		popups: {
			goalQm: 'Goal QM popup text here EE',
			goalInfo: 'Goal Info popup text here EE'
		}
	},
	lv: {
		message: {
			header: "RIMI LMS 3.0 (LV)"
		},
		goals: {
			addNewText: 'Add an information about the task (LV)'
		},
		howToSections: {
			Section1: {
				sectionTitle: 'Learn from colleagues lv',
				sectionDescription: 'Learn from colleagues description here lv',
				sectionTexts: {
					text1: 'Vai Tu zini, ko vēlies attīstīt? lv',
					options1: ['Nē, es īsti nezinu, ak ko sākt', 'Aptuveni zinu, bet nespēju konkrēti nodefinēt', 'Diezgan skaidri zinu, ko vēlos attīstīt'],
					text2: 'Attīstības mērķi ir zināšanas, prasmes, attieksme vai uzvedība, kas jāiegūst vai jāpilnveido, lai Tu veicinātu savu izaugsmi, uzlabotu darba uzpildi un sasniegnu Tev uzliktos biznesa mērķus. lv',
					text3: 'Savā pašreizējā amatā esmu sasniedzis zināsanu un prasmju griestus lv',
					options2: ['JĀ, esmu gatavs jauniem izaicinājumiem', 'NĒ, man šajā jomā vēl ir kur augt'],
					options3: ['Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt']
				}
			},
			Section2: {
				sectionTitle: 'Mācies darba vietā lv',
				sectionDescription: 'Macies darba vieta description here lv',
				sectionTexts: {}
			},
			Section3: {
				sectionTitle: 'Izzini pats',
				sectionDescription: 'Izzini pats section description here lv',
				sectionTexts: {}
			},
			Section4: {
				sectionTitle: 'Apmeklē kursus',
				sectionDescription: 'Apmeklē kursus description here lv',
				sectionTexts: {}
			}
		},
		popups: {
			goalQm: 'Goal QM popup text here LV',
			goalInfo: 'Goal Info popup text here LV'
		}
	},
	lt: {
		message: {
			header: "RIMI LMS 3.0 (LT)"
		},
		goals: {
			addNewText: 'Add an information about the task (LT)'
		},
		howToSections: {
			Section1: {
				sectionTitle: 'Learn from colleagues lt',
				sectionDescription: 'Learn from colleagues description here lt',
				sectionTexts: {
					text1: 'Vai Tu zini, ko vēlies attīstīt? lt',
					options1: ['Nē, es īsti nezinu, ak ko sākt', 'Aptuveni zinu, bet nespēju konkrēti nodefinēt', 'Diezgan skaidri zinu, ko vēlos attīstīt'],
					text2: 'Attīstības mērķi ir zināšanas, prasmes, attieksme vai uzvedība, kas jāiegūst vai jāpilnveido, lai Tu veicinātu savu izaugsmi, uzlabotu darba uzpildi un sasniegnu Tev uzliktos biznesa mērķus. lt',
					text3: 'Savā pašreizējā amatā esmu sasniedzis zināsanu un prasmju griestus lt',
					options2: ['JĀ, esmu gatavs jauniem izaicinājumiem', 'NĒ, man šajā jomā vēl ir kur augt'],
					options3: ['Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt']
				}
			},
			Section2: {
				sectionTitle: 'Mācies darba vietā lt',
				sectionDescription: 'Macies darba vieta description here lt',
				sectionTexts: {}
			},
			Section3: {
				sectionTitle: 'Izzini pats',
				sectionDescription: 'Izzini pats section description here lt',
				sectionTexts: {}
			},
			Section4: {
				sectionTitle: 'Apmeklē kursus',
				sectionDescription: 'Apmeklē kursus description here lt',
				sectionTexts: {}
			}
		},
		popups: {
			goalQm: 'Goal QM popup text here LT',
			goalInfo: 'Goal Info popup text here LT'
		}
	},
	es: {
		message: {
			header: "El Custom Header"
		},
		goals: {
			addNewText: 'Add an information about the task Custom Header'
		},
		howToSections: {
			Section1: {
				sectionTitle: 'Learn from colleagues es',
				sectionDescription: 'Learn from colleagues description here es',
				sectionTexts: {
					text1: 'Vai Tu zini, ko vēlies attīstīt? es',
					options1: ['Nē, es īsti nezinu, ak ko sākt', 'Aptuveni zinu, bet nespēju konkrēti nodefinēt', 'Diezgan skaidri zinu, ko vēlos attīstīt'],
					text2: 'Attīstības mērķi ir zināšanas, prasmes, attieksme vai uzvedība, kas jāiegūst vai jāpilnveido, lai Tu veicinātu savu izaugsmi, uzlabotu darba uzpildi un sasniegnu Tev uzliktos biznesa mērķus. es',
					text3: 'Savā pašreizējā amatā esmu sasniedzis zināsanu un prasmju griestus es',
					options2: ['JĀ, esmu gatavs jauniem izaicinājumiem', 'NĒ, man šajā jomā vēl ir kur augt'],
					options3: ['Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kāda pieredze Tev noderētu un ko Tu varētu mācīties, lai sasniegtu karjeras mērķus?','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt','Kādas zināšanas Tev būtu vērtigi iegūt']
				}
			},
			Section2: {
				sectionTitle: 'Mācies darba vietā es',
				sectionDescription: 'Macies darba vieta description here es',
				sectionTexts: {}
			},
			Section3: {
				sectionTitle: 'Izzini pats',
				sectionDescription: 'Izzini pats section description here es',
				sectionTexts: {}
			},
			Section4: {
				sectionTitle: 'Apmeklē kursus',
				sectionDescription: 'Apmeklē kursus description here es',
				sectionTexts: {}
			}
		},
		popups: {
			goalQm: 'Goal QM popup text here ESPANOL',
			goalInfo: 'Goal Info popup text here ESPANOL'
		}
	}
}

Vue.use(VueI18n);
Vue.config.lang = 'eng';

Object.keys(locales).forEach(function(lang) {
	Vue.locale(lang, locales[lang])
});


// var info = autoprefixer().info();
// console.log(info);


sync(store, router)

// const app = new Vue({
// 	el: '#app',
// 	router,
// 	render: h => h(App)
// })

const app = new Vue({
	router,
	store,
	...App
}).$mount('#app')

export { app, router, store }