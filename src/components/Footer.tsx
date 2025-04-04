const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={'border-t'}>
      <div className='p-4 flex items-center justify-center'>
        {currentYear} BAODEV. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
