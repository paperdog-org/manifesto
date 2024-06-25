import { Stack, HStack, Link, Center, Image, IconButton, LinkProps } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

const links = [
    {
        label: 'ABOUT', 
        url: '/about'
    },
    {
      label: 'TRANSMISSIONS', 
      url: '/transmissions'
    },
    {
        label: 'TERMS', 
        url: '/terms'
    },
    {
        label: 'POLICY', 
        url: '/policy'
    },
];
const accounts = [
  {
    url: 'https://github.com/paperdog-org',
    label: 'Github Account',
    type: 'blackAlpha',
    icon: <Image className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    src="/github-mark-white.png"
    alt="/github-mark-black.png"
    width={7}
    height={7}
    />
  },
  {
    url: 'https://x.com/PaperDogAI',
    label: 'X Account',
    type: 'blackAlpha',
    icon: <Image className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    src="/x-logo-black.png"
    alt="X logo"
    width={7}
    height={7}
    />
  },
  {
    url: 'https://t.me/@paperdog',
    label: 'Telegram Account',
    type: 'blackAlpha',
    icon: <Image className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    src="/tg-logo-blue.png"
    alt="Telegram logo"
    width={7}
    height={7}
    />
  },
];

const Footer = () => {
  return (
    <div className="items-center text-center">
    
      <Center>
        <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/pdognobgfocus.png"
            alt="PaperDog"
            width={20}
        />
      </Center>
      <br/><br/>
      <Center>
        <b>
          <HStack spacing={4} alignItems="center" pt={{ base: 'none', md: 'flex' }}>
            {links.map((link, index) => (
              <CustomLink key={index} href={link.url} target="_blank">{link.label}</CustomLink>
            ))}
          </HStack>
        </b>
      </Center>
      <br/><br/>
      <Center>
        <Stack direction="row" spacing={5} pt={{ base: 4, md: 0 }} alignItems="center">
          {accounts.map((sc, index) => (
            <IconButton
              key={index}
              as={Link}
              isExternal
              href={sc.url}
              aria-label={sc.label}
              colorScheme={sc.type}
              icon={sc.icon}
              rounded="md"
            />
          ))}
        </Stack>
      </Center>
    
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    </div>
  );
};

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
      {children}
    </Link>
  );
};

export default Footer;