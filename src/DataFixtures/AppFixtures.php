<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Invoice;
use App\Entity\Customer;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    protected $encoder;
    public function __construct( UserPasswordHasherInterface $encoder){
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');


        for ($u = 0; $u < 10; $u++) {
            $user = new User();
            $chrono = 1;
            $hash = $this->encoder->hashPassword($user, "password");
            $user->setFirstname($faker->firstName())
                ->setLastname($faker->lastName())
                ->setEmail($faker->Email())
                ->setPassword($hash);

            $manager->persist($user);

            for ($x = 0; $x < mt_rand(5, 20); $x++) {
                $customer = new Customer();
                $customer->setFirstname($faker->firstName())
                    ->setLastname($faker->lastName())
                    ->setCompany($faker->company())
                    ->setEmail($faker->email())
                    ->setUser($user);

                $manager->persist($customer);

                for ($y = 0; $y < mt_rand(3, 10); $y++) {
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 250, 5000))
                        ->setSentAt($faker->dateTimeBetween('-6 months'))
                        ->setStatus($faker->randomElement(["SENT", "PAID", "CANCELLED"]))
                        ->setCustomer($customer)
                        ->setChrono($chrono);
                    $chrono++;
                    $manager->persist($invoice);
                }
            }
        }

        // $product = new Product();
        // $manager->persist($product);

        $manager->flush();
    }
}
