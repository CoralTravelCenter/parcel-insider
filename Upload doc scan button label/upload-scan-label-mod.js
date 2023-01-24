
Array.from($('section.formPayerAndContractPerson button.btnImageUploadDropdown').get(0).childNodes).find(el => el.nodeType === 3).textContent = 'Загрузите фото паспорта РФ';

$('section.formPassenger').each(function (idx, section) {
    var $section = $(section);
    var data = $section.attr('data-rules');
    var button_text = ''
    try {
        var info = JSON.parse(data);
        var destinationRussia = info.TouristMandatoryInfo[0].Destination === 3;
        button_text = ({
            '0': 'Загрузите фото загранпаспорта',
            '1': 'Загрузите фото паспорта РФ',
            // '10': 'Загрузите фото св-ва о рождении',
            '10': ''
        })[info.DocumentType];
        if (button_text) {
            var button = $section.find('button.btnImageUploadDropdown').get(0);
            Array.from(button.childNodes).find(el => el.nodeType === 3).textContent = button_text;
        }
    } catch (ex) {
        console.log(ex);
    }
});
