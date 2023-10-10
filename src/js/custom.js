$(document).ready(function () {

   $('.owl-carousel').owlCarousel();

   let titulos = $('h4') // tag

   let itens = $('.featured-item') // class

   let destaques = $('#featured') // id

   // console.log(titulos.first());

   // Configuração de produtos

   $('.featured-item a').addClass('btn btn-dark stretch-link');

   $('.featured-item:nth(0) h4').append('<span class="badge bg-secondary"> Novo</span>')
   $('.featured-item:nth(1) h4').append('<span class="badge bg-secondary"> Novo</span>')
   $('.featured-item:nth(2) h4').append('<span class="badge bg-secondary"> Novo</span>')

   $('.featured-item h4').dblclick(function () {

      $(this).css({
         'color': '#f00',
         'background': '#ff0',
         'font-weight': '100',
      });

   });

   $('.featured-item a').on('blur', function (event) {

      event.preventDefault();

      alert(' Produto esgotado');

   })

   $('.featured-item:nth(1)')
      .hide(1000, function () {
         console.log($(this).find('h4').text() + ' esgotado')
      })
      .show(1000, function () {
         console.log($(this).find('h4').text() + ' em estoque')
      })

   const duracao = 1000 // equivalenta a 1 segundo

   $('.featured-item:nth(0)')
      .fadeOut(duracao)
      .fadeIn(duracao)

   $('#form-submit').on('click', function (e) {

      e.preventDefault()

      if ($('#email').val() != '') {

         $('#email').animate({
            opacity: "toggle",
            top: ""
         }, duracao, function () {
            console.log($(this).val())
         })
      }

   });

   $('.nav-modal-open').on('click', function (e) {

      e.preventDefault();

      let elem = $(this).attr('rel')

      $('.modal-body').html($('#' + elem).html())
      $('.modal-header h5.modal-title').html($(this).text())

      let myModal = new bootstrap.Modal($('#modelId'))

      myModal.show()

   })

   $(document).ready(function () {
      $('#form-01').on('submit', function (e) {
         e.preventDefault()

         var myModal = new bootstrap.Modal($('#modelId'));
         myModal.hide();
      })
   })

   /*
   * TODO: incrementar a validação
   * - checar se o nome é válido (mais de 2 caracteres)
   * - checar se o email é válido com ao menos um "@" e "."
   * - checar se o cpf é válido com regex
   */
   function validate(elem) {
      if (elem.val() == '') {
         console.log('O campo de ' + elem.attr('name') + ' é obrigatório')

         elem.parent().find('.text-muted').show()

         elem.addClass('invalid')

         return false
      } else {
         elem.parent().find('.text-muted').hide()
         elem.removeClass('invalid')
      }
   }

   $('body').on('submit', '.modal-body .form', function (e) {

      e.preventDefault()

      const inputName = $('#nome')
      const inputEmail = $('#email')
      const inputCpf = $('#cpf')

      validate(inputName)
      validate(inputEmail)
      validate(inputCpf)

      if (inputName.hasClass('invalid' || inputCpf.hasClass('invalid') || inputEmail.hasClass('invalid'))) {
         console.log('verificar campos obrigatórios')
         return false
      } else {
         $(this).submit()
      }
   })

   $('body').on('blur', '#nome', function (e) {
      validate($(this));
      const nome = $(this).val();
      const regex = /^[a-zA-Z\s]+$/; // Expressão regular para permitir apenas letras e espaços

      if (!regex.test(nome) || nome.length < 5) {
         console.log("Nome inválido");
         $(this).addClass('invalid');
      } else {
         $(this).removeClass('invalid');
         console.log('Nome válido');
      }
   });

   $('body').on('blur', '#email', function (e) {
      validate($(this))
      const validateEmail = $(this).val()
      const regex = /^[a-z0-9.]+@[a-z0-9]+(\.[a-z]+)+$/i;
      if (!regex.test(validateEmail)) {
         console.log('E-mail inválido');
         $(this).addClass('invalid')
      } else {
         $(this).removeClass('invalid')
         console.log('E-mail válido')
      }
   })

   $('body').on('blur', '#cpf', function (e) {
      validate($(this))
      $(this).mask('000.000.000-00')
      const validatCpf = ($(this).val())
      const regex = /[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/i;
      if (!regex.test(validatCpf)) {
         console.log('Cpf inválido');
         $(this).addClass('invalid')
      } else {
         $(this).removeClass('invalid')
         console.log('Cpf válido')
      }
   })

   $('body').on('blur', '#informar', function (e) {
      validate($(this))
   })
});

