ig.module( 
  'game.main'
)
.requires(
  'impact.game',
  'impact.font',
  'plugins.parallax'
)
.defines(function(){

  new ig.Image('media/mobile/background.png');
  new ig.Image('media/mobile/background2.png');

  gameWidth = 320;
  gameHeight = 240;
  gameScale = 2;
  titleText = 'Project Hope';

  start_screen = ig.Game.extend({

    parallax: null,

    init: function(){
      this.parallax = new Parallax();
      this.parallax.add('media/mobile/background2.png', {distance: 5, y: 50});
      this.parallax.add('media/mobile/background.png', {distance: 2, y: 50});

      ig.system.context.font = 'bold 22px sans-serif';

      /*ig.music.add('media/title.*');
      ig.music.volume = 1.0;
      ig.music.play();*/
    },

    update: function(){
      this.parallax.move(75);
    },

    draw: function(){
      this.parent();
      this.parallax.draw();

      ig.system.context.fillStyle = 'white';
      ig.system.context.fillText (titleText, 260, 60);
    }
  });

  over_nrd_logo = ig.Game.extend({

    logo_art: new ig.Image('media/mobile/ovrnrd_logo.png'),
    logo_text: new ig.Image('media/mobile/ovrnrd_text.png'),

    init: function(){},

    update: function(){},

    draw: function(){
      ig.system.clear('white');

      x = (ig.system.width - 180)/2;
      this.logo_art.draw(x,17);
      this.logo_text.draw(x, 212);

      setTimeout(function(){
        ig.system.setGame(lbs_logo1);
      }, 1500);
    }
  });

  lbs_logo1 = ig.Game.extend({
   logo: new ig.Image('media/mobile/lifebar1.jpg'),

    init: function(){},

    update: function(){},

    draw: function(){
      ig.system.clear('#e2e2e2');

      x = (ig.system.width - 180)/2;
      y = (ig.system.height - 60)/2;
      this.logo.draw(x,y);

      setTimeout(function(){
        ig.system.setGame(lbs_logo2);
      }, 3000);
    }
  });

  lbs_logo2 = ig.Game.extend({
    logo: new ig.Image('media/mobile/lifebar2.jpg'),

    init: function(){},

    update: function(){},

    draw: function(){
      ig.system.clear('#fbfbfb');

      x = (ig.system.width - 180)/2;
      y = (ig.system.height - 60)/2;
      this.logo.draw(x,y);

      setTimeout(function(){
        ig.system.setGame(start_screen);
      }, 3000);
    }
  });

  if(ig.ua.mobile){
    ig.Sound.enabled = false;
    gameScale = 1;
  }

  ig.main( '#canvas', over_nrd_logo, 60, gameWidth, gameHeight, gameScale );
});