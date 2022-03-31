import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import "./LanguageChanger.scss";

const LanguageChanger = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const languages = [
    { name: "TR", code: "tr" },
    { name: "EN", code: "en" },
  ];
  const selectedLanguage = i18n.language;

  return (
    <>
      {languages.map((language) => {
        return (
          selectedLanguage !== language.code && (
            <IconButton
              key={language.code}
              color="inherit"
              onClick={() => changeLanguage(language.code)}
            >
              <span className="text">{language.name}</span>
            </IconButton>
          )
        );
      })}
    </>
  );
};
export default LanguageChanger;
