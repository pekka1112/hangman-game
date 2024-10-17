
$(document).ready(function(){
    let currentPage = 1;
    $('#nextBtn').on('click', function(){
        if(currentPage === 1){
            $('#page-one').addClass('d-none');
            $('#page-two').removeClass('d-none');
            $('#backBtn').removeClass('d-none');
            $('#nextBtn').text('Xác nhận');
            currentPage++;
        }else{
            $('#configurationModal').modal('hide');
        }
    });
    $('#backBtn').on('click', function(){
        if(currentPage === 2){
            $('#page-two').addClass('d-none');
            $('#page-one').removeClass('d-none');
            $('#backBtn').addClass('d-none');
            $('#nextBtn').text('Tiếp theo');
            currentPage--;
        }
    });
    $('#teamNumber').on('input', function(){
        let teamNumber = parseInt($(this).val());
        let teamNameFields = $('#teamNameFields');
        teamNameFields.empty();

        for (let i = 0; i < teamNumber; i++) {
            let field = $('<div class="form-group m-3"></div>');
            let label = $('<label for="teamName' + i + '">Tên đội chơi ' + (i + 1) + '</label>');
            let input = $('<input type="text" class="form-control" id="teamName' + i + '" placeholder="Nhập tên đội chơi '+ (i+1) +'">');
            field.append(label);
            field.append(input);
            teamNameFields.append(field);
        }
    });
});
$(document).ready(function() {
    $('.form-control').focus(function() {
        $(this).prev('label').addClass('label-focus');
    }).blur(function() {
        $(this).prev('label').removeClass('label-focus');
    });
});
