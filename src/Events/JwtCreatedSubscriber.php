<?php  

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {

    //fonction permettant de modifier le contenu du token afin d'y ajouter de la DATA
    public function updateJwtData(JWTCreatedEvent $event){

        $user = $event->getUser();
        $data = $event->getData();
        $data['firstname'] = $user->getFirstname();
        $data['lastname'] = $user->getLastname();
        $event->setData($data);
    }

}