<?php 

namespace App\Events;

use App\Entity\User;
use App\Entity\Customer;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CustomerUserSubscriber implements EventSubscriberInterface{
    
    private $security;

    public function __construct(Security $security){
        $this->security = $security;
    }

    public static function getSubscribedEvents(){
        //on se retrouve au moment ou API PLAFORM a fini de désérialiser le JSON et il s'apprête à l'envoyer à la base de données
        return [
            KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function setUserForCustomer(ViewEvent $event){

        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($result instanceof Customer && $method === "POST"){
            //catch logged user 
            $user = $this->security->getUser();

            //assign customer to logged user 
            $result->setUser($user);
        }
    }
}