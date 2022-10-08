<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use App\Repository\CustomerRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class GetInvoicesController extends AbstractController
{
    private $invoiceRepo;
    private $security;
    public function __construct(InvoiceRepository $invoiceRepo, Security $security)
    {
        $this->security = $security;
        $this->invoiceRepo = $invoiceRepo;
    }


    public function __invoke()
    {
        if ($this->security->isGranted("ROLE_ADMIN", $this->security->getUser())) {
            return $this->invoiceRepo->findAll();
        } else {
            $invoices =  $this->invoiceRepo->findByUser($this->security->getUser());
        }
        return $invoices;
    }
}
