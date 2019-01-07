<!-- footer -->
<footer class="footer">
  <small class="footer__copyright">&copy; 2018. <strong>UI Lab</strong> All rights reserved.</small>
</footer>
<!-- //footer -->

<!-- Library -->
<script src="../common/js/jquery.js"></script>
<script src="../common/js/uilab-library.js"></script>
<script>
$(document).ready(function(){
            var deviceWidth = $('body').width();
            var $aside = $('.aside--mobile');
            var $gnb = $('.gnb__item')

            function basicToggle(self, activeClass) {
                var _self = self;
                var actC = activeClass;

                _self.toggleClass(actC);
            }
if(deviceWidth <= 767){
                $('[data-js=aside__toggle]').on('click', function(e) {
                    e.preventDefault();
                    basicToggle($aside, 'is-active');
                });
} else {
                return false;
            }

$(window).resize(function(){
                if(deviceWidth <= 767){
                    $('[data-js=aside__toggle]').on('click', function(e) {
                        e.preventDefault();
                        basicToggle($aside, 'is-active');
                    });
} else {
                    return false;
                }
});
});
</script>

<!-- Syntax Highlighter -->
<script type="text/javascript" src="../common/lib/syntaxhighlighter/js/shCore.js"></script>
<script type="text/javascript" src="../common/lib/syntaxhighlighter/js/shBrushCss.js"></script>
<script type="text/javascript" src="../common/lib/syntaxhighlighter/js/shBrushJScript.js"></script>
<script type="text/javascript" src="../common/lib/syntaxhighlighter/js/shBrushXml.js"></script>
<script type="text/javascript">
SyntaxHighlighter.all();
</script>