import { db, User, Transaction } from './database';

const seed = async () => {
  await db.sync({ force: true });
  const roger = await User.create({
    firstName: 'Roger',
    lastName: 'Maloutou',
    picture: 'http://placehold.it/430x430',
  });
  const jane = await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    picture: 'http://placehold.it/430x430',
  });
  const jack = await User.create({
    firstName: 'Jack',
    lastName: 'Daniels',
    picture: 'http://placehold.it/430x430',
  });
  const big = await User.create({
    firstName: 'Big',
    lastName: 'Shaq',
    picture: 'http://placehold.it/430x430',
  });
  await roger.setFriends([jane, jack, big]);

  const mcdo1 = await Transaction.create({
    description: 'McDo 1',
    amount: 1337,
  });
  await mcdo1.setLender(roger);
  await mcdo1.setBorrowers([roger, big]);

  const mcdo2 = await Transaction.create({
    description: 'McDo 2',
    amount: 1338,
  });
  await mcdo2.setLender(roger);
  await mcdo2.setBorrowers([big, jack]);

  const mcdo3 = await Transaction.create({
    description: 'McDo 3',
    amount: 4242,
  });
  await mcdo3.setLender(roger);
  await mcdo3.setBorrowers([roger, jane, jack]);

  process.exit();
};

seed();
