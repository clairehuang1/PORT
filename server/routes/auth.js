const express = require('express');
const validator = require('validator');
const passport = require('passport');
const Merchant = require('mongoose').model('Merchant');
const Product = require('mongoose').model('Product');
const User = require('mongoose').model('User');
const CartItem = require('mongoose').model('CartItem');
const Cart = require('mongoose').model('Cart');
const scraperjs = require('scraperjs');
const router = new express.Router();
const scrape = new scraperjs.Router();


scrape.otherwise(function(url){
  console.log("scrape doesn't work: " + url);
})

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.first !== 'string' || payload.first.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }
  console.log(isFormValid);
  console.log(errors);
  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }


  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }


  if (!isFormValid) {
    message = 'Check the form for errors.';
  }


  return {
    success: isFormValid,
    message,
    errors
  };
};
//
// const urls = ["eyeshadow"]
//
// if(!urls || !urls.length) {
// 	console.log("nooooo");
// 	return;
// }
//
// scrape.on('https?://sokoglam.com/collections/:id')
// .createStatic()
//     .scrape(function($) {
//
//       return $('.image-cont').map(function() {
//         // return {name:$(this).first().text().trim(), colors: $(this).children().next().text().trim(), price: $(this).children().next().next().text().trim()}
//         console.log($(this).children('.more-info').children('.inner').children('.innerer').chilren('.title').text());
//         return({
// 					name:$(this).children('.more-info').children('.inner').children('.innerer').children('.title').text().trim(),
// 					price:$(this).children('.more-info').children(".inner").children('.innerer').children('.price').text().trim().split("\n")[0],
// 					link:"https://sokoglam.com"+ $(this).children('.more-info').attr('href'),
// 					img:"https:" + $(this).children('.more-info').children('img').attr('src')
// 			})
//       }).get();
//
//     })
//     .then(function(links,utils) {
//       console.log("betchs");
//       console.log(links);
//       var category = utils.params.id;
//
//       for(var i=0; i <links.length;i++){
//
//         var product = new Product({
//           merchantId: "test",
//           title:links[i].name,
//           link:links[i].link,
//           src: links[i].img,
//           price: links[i].price
//
//         })
//         product.save().catch(function(err) {
//           console.log('Error: ', err);
//           res.status(500).send();
//         })
//       }
//
//
//     });
//   for (var i=0; i<urls.length;i++){
//     console.log("https://sokoglam.com/collections/"+urls[i]);
//     scrape.route("https://sokoglam.com/collections/"+urls[i], function(boolval){
//           if(boolval){
//             console.log("ASUH betches");
//           }
//         })
//       }
//MEJURI STARTS HERE
// const urls = ["rings","pendants","earrings","bracelets"]
//
// if(!urls || !urls.length) {
// 	console.log("nooooo");
// 	return;
// }
//
// scrape.on('https?://mejuri.com/shop/t/type/:id')
// .createStatic()
//     .scrape(function($) {
//       return $('[data-hook=products_list_item]').map(function() {
//         // return {name:$(this).first().text().trim(), colors: $(this).children().next().text().trim(), price: $(this).children().next().next().text().trim()}
// 				return({
// 					name:$(this).children('.product-info').children(".product-name").text().trim(),
// 					colors:$(this).children('.product-info').children(".product-details").text().trim(),
// 					price:$(this).children('.product-info').children(".product-price").text().trim().split("\n")[0],
// 					link:"http://www.mejuri.com"+ $(this).children('.product-image').attr('href'),
// 					img:"http:" + $(this).children('.product-image').children('.main-image').attr('src')
// 			})
//       }).get();
//
//     })
//     .then(function(links,utils) {
//       var category = utils.params.id;
//
//       for(var i=0; i <links.length;i++){
//
//         var product = new Product({
//           merchantId: "58d1c46cb31f3e83b68ad78a",
//           title:links[i].name,
//           link:links[i].link,
//           src: links[i].img,
//           price: links[i].price
//
//         })
//         product.save().catch(function(err) {
//           console.log('Error: ', err);
//           res.status(500).send();
//         })
//       }
//
//
//
//
//
//     });
//   for (var i=0; i<urls.length;i++){
//     scrape.route("https://mejuri.com/shop/t/type/"+urls[i], function(boolval){
//           if(boolval){
//             console.log("ASUH");
//           }
//         })
//       }

//HI CLUR, i just quickly set these routes up for you
//just like with any other API, just let me know what kind of data needs to be
//received from the front and then also tell me what kind of information
//you will spit back out that I can use on the front
//Obviously add additional routes as needed and change the names or whatever lol

router.post('/createNewOrder', function(req, res) {

})

router.post('addItemToCart/:cartId', function(req, res) {

})

router.get('/loadmerchants', function(req, res) {
  Merchant.find({})
  .sort({name: 1})
  .exec()
  .then((merchants) => {
    res.status(200).json({
      message: 'Here are all your merchants bitch',
      allmerchants: merchants
    });
  })
  .catch((err) => res.sendStatus(500).send(err))
});

router.get('/showproducts/:merchId', function(req, res) {
  console.log('poop', req.params.merchId);
  Product.findOne({merchantId: req.params.merchId})
  .exec()
  .then(function(products) {
    res.status(200).json({
      products: products
    });
  })
  .catch((err)=>console.log('error: ', err));
});

router.get('/joinCart/:cartId', function(req, res) {

  var promise = User.findById(req.user._id).exec();
  promise.then(function(user) {
    console.log('req.user is: ', user);
    user.cartRef = req.params.cartId;
    user.save();
    console.log('user updated cart: ', req.user.cartRef);
    res.status(200).send({
      cart: req.user.cartRef
    })
  })
  .catch((err) => {
    console.log('error: ', err);
    res.status(500).send({
      error: err
    })
  })
})

router.get('/join/:cartId', function(req, res) {
  //Render join form
  console.log('yo i am here', req.params.cartId);

  Cart.findById(req.params.cartId).exec()
  .then(function(cart){
    console.log("SUP BITCHES" + cart);
    return User.findById(cart.creatorId).exec()
  })
  .then((user) => {
    console.log("yo dis mi user" + user.name);


    res.status(200).json({
      message: 'HULLO I FOUND DA USER',
      user: user.name
    })
  })
  .catch((err) => res.sendStatus(500).send(err));
})

router.post('/cart/:cartId/', function(req,res){
  console.log("this ths uer "+ req.user);
  console.log("asuh");
  Cart.findById(req.params.cartId).exec()
  .then(function(cart){
    console.log("ash");
    cart.users.push(req.user);
    return cart.save();
  }).then(function(cart){
    console.log(cart);
    console.log("YO IM REACHED");
    res.status(200).json({
      message:"asuh i got da shared cart",
      cartId:cart._id,
      userId:req.user._id
    })
  }).catch((err) => res.sendStatus(500).send(err));
})

router.post('/removecartitem/:cartId', function(req,res){
  CartItem.findOneAndRemove({
    cartId:req.params.cartId, productName: req.body.title,
    orderedBy:req.user._id}).exec()
    .then(function(user){
      console.log(user + " dis success");
    }).catch(function(err){
      console.log('error: ',err);
    })

})



router.get('/findProductsByName/:name', function(req, res) {

  Merchant.findOne({name: req.params.name}, function(err, found) {
    if (err) {
      console.log('error: ', err);
    } else {
      Product.find({merchantId : found._id}, function(err, products) {
        if (err) {
          console.log('error: ', err);
        } else {
          res.status(200).json({
            message: 'got the products for ' + found.name,
            products: products
          })
        }
      })
    }
  })

})

router.post('/addmerchant', function(req, res) {
  console.log('body:', req.body);
  var merch = new Merchant(req.body);
  merch.save()
  .then(res.status(200).send())
  .catch((err) => {
    console.log('Error: ', err);
    res.status(500).send(err);
  })
})

router.post('/addCartItem/:cartId', function(req, res){
  var findCartPromise = new Promise(function(resolve, reject){
    Cart.findById(req.params.cartId, function(err, cart){
      if(err){
        reject(err);
      }
      resolve(cart);
    })
  })

})
router.post('/addMerchantItem/:merchant', function(req, res) {

  var findMerchantPromise = new Promise(function(resolve, reject) {
    Merchant.findById(req.params.merchant, function(err, merchant) {
      if (err) {
        reject(err);
      }
      resolve(merchant);
    });
  });

  findMerchantPromise.then(function(foundMerchant) {
    req.body.forEach(function(item) {
      var product = new Product(item);
      product.merchantId = foundMerchant._id;
      product.save(function(err, prod) {
        if (err) {
          res.status(500).json({
            message: 'problem saving product'
          })
        }
      })
    })
    res.status(200).json({
      message: 'new products have been saved for ' + foundMerchant.name
    })
  })
  .catch((err) => res.status(500).json({
    message: 'merchant does not exist'
  }));
});


router.post('/signup', function(req, res, next) {
  const validationResult = validateSignupForm(req.body);

  console.log("IVE BEEN HIT");
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Go to login page to log in.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form'
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});

module.exports = router;
