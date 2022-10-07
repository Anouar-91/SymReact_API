<?php 

namespace App\Events;

use DateTime;
use App\Entity\User;
use App\Entity\Invoice;
use App\Entity\Customer;
use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class InvoiceChronoSubscriber implements EventSubscriberInterface{
    
    private $security;
    private $repository;

    public function __construct(Security $security, InvoiceRepository $invoiceRepository){
        $this->security = $security;
        $this->repository = $invoiceRepository;
    }

    public static function getSubscribedEvents(){
        //on se retrouve au moment ou API PLAFORM a fini de désérialiser le JSON et il s'apprête à l'envoyer à la base de données
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function setChronoForInvoice(ViewEvent $event){
       
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($result instanceof Invoice && $method === "POST"){

            $nextChrono = $this->repository->findNextChrono($this->security->getUser());
            $result->setChrono($nextChrono);
            if(empty($result->getSentAt())){
                $result->setSentAt(new \DateTime());
            }
        }


    }
}