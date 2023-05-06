import { CodeViewer, SingleImageViewer } from "@yamato-daiwa/frontend";
import { LanguageDropDownList } from "@yamato-daiwa/frontend-documenting_kit/Components";


CodeViewer.initializeAllInstances();
SingleImageViewer.initializeAllInstances();

LanguageDropDownList.pickBySelector("#LANGUAGE_DROP_DOWN_LIST");
